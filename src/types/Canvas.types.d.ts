export interface TextBase {
  fontSize: number;
  fontFamily: string;
  fontWeight: number;
  textAlign: string;
  textBaseline: string;
}
export type TypeLayer = 'text' | 'image' | 'icon' | 'name'
export interface Base {
  height: number
  width: number
  color?: string
}
export interface Coordinate {
  x: number
  y: number
}
export interface Canvas extends Base, TextBase {
  layers: Layer[]
}
export type Layer = Partial<Image & Text & Name & Icon> & { id: number }
export interface Image extends Coordinate, Base {
  type: TypeLayer
  img: string | undefined
}
export interface Icon extends Coordinate, Base {
  type: string
  shape: string
}
export interface Name extends Coordinate {
  type: TypeLayer
  nameType: string
  size: number
  family: string
  weight: number
  limitLetters: number
  align: CanvasTextAlign
  baseline: CanvasTextBaseline
  color?: string | undefined
}
export interface Text extends Coordinate {
  type: TypeLayer
  content: string
  size: number
  family: string
  weight: number
  limitLetters: number
  align: CanvasTextAlign
  baseline: CanvasTextBaseline
  color?: string | undefined
}

export interface User {
  id: string;
  username: string;
  globalName: string | null | undefined;
  count: number | undefined;
  avatar: string | null | undefined;
}
