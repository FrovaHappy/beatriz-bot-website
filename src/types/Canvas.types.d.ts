export interface TextBase {
  fontSize: number;
  fontFamily: string;
  fontWeight: number;
  textAlign: string;
  textBaseline: string;
}

export interface Base {
  height: number;
  width: number;
  color: string;
}

export interface Canvas extends Base, TextBase {
  layers: Layer[];
}
export type Layer = Partial<Image & Text & Name & Icon> & { id: number };
export interface Image {
  type: string;
  height: number;
  width: number;
  x: number;
  y: number;
  img: string | undefined;
}
export interface Icon {
  type: string;
  height: number;
  width: number;
  x: number;
  y: number;
  shape: string;
  color?: string | null | undefined;
}
export interface Name {
  type: string;
  x: number;
  y: number;
  size: number;
  family: string;
  weight: number;
  limitLetters: number;
  align: string;
  baseline: string;
  nameType: string;
  color?: string | null | undefined;
}
export interface Text {
  type: string;
  x: number;
  y: number;
  size: number;
  family: string;
  weight: number;
  limitLetters: number;
  content: string;
  align: CanvasTextAlign;
  baseline: CanvasTextBaseline;
  color?: string | null | undefined;
}

export interface User {
  id: string;
  username: string;
  globalName: string | null | undefined;
  count: number | undefined;
  avatar: string | null | undefined;
}
