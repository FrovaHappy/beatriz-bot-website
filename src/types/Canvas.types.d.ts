export interface Canvas {
  height: number;
  width: number;
  layers: Layer[];
  background?: string | null | undefined;
  colorDominate?: string | null | undefined;
}
export type Layer = Partial<Image & Text & Name & Icon> & {id: number};
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
  align: string;
  baseline: string;
  color?: string | null | undefined;
}
