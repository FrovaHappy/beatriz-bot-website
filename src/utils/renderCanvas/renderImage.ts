import { Base, Image, TextBase, User } from '@/types/Canvas.types'
import { userFormatting } from '../formattingText'

export async function renderImage(
  image: Image,
  ctx: CanvasRenderingContext2D,
  base: Base & TextBase,
  loadImage: (k: string) => Promise<HTMLImageElement>
) {
  const { x, y, height, width, type, img, color } = image
  ctx.fillStyle = color ?? base.color ?? 'transparent'
  ctx.fillRect(x, y, width, height)
  if (img) ctx.drawImage(await loadImage(img), x, y, height, width)
}
