import { Base, Layer, Text, TextBase, User, Image } from '@/types/Canvas.types'
import { renderText } from './renderText'

import { promises } from 'dns'
import { renderImage } from './renderImage'

interface Path {
  new (path?: string | Path2D | undefined): Path2D
  prototype: Path2D
}
export default async function renderCanvas(
  layers: Layer[],
  base: Base & TextBase,
  user: User,
  ctx: CanvasRenderingContext2D,
  Patch2DInstance: Path,
  loadImage: (path: string) => Promise<HTMLImageElement>
) {
  ctx.reset()
  if (base.color) {
    ctx.fillStyle = base.color
    ctx.fillRect(0, 0, base.width, base.height)
  }
  for (const layer of layers) {
    switch (layer.type) {
      case 'text':
        renderText(layer as Text, ctx, user, base)
        break
      case 'image':
        await renderImage(layer as Image, ctx, base, loadImage)
        break
    }
  }
}
