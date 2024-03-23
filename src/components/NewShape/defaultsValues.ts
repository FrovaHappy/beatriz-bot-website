import { Icon, Name, Text, Image } from "@/types/Canvas.types";

const TEXT: Text = {
  type: "text",
  x: 0,
  y: 0,
  content: "Example",
  size: 32,
  family: "Roboto",
  weight: 400,
  limitLetters: 0,
  align: "start",
  baseline: "bottom",
};

const ICON: Icon = {
  type: "icon",
  height: 200,
  width: 200,
  x: 0,
  y: 0,
  shape: "square",
};

const NAME: Name = {
  type: "name",
  x: 0,
  y: 0,
  size: 32,
  family: "Roboto",
  weight: 400,
  limitLetters: 0,
  align: "start",
  baseline: "bottom",
  nameType: "username",
};

const IMAGE: Image = {
  type: "image",
  height: 200,
  width: 200,
  x: 0,
  y: 0,
  img: undefined,
};

const defaultValue = {
  TEXT,
  ICON,
  NAME,
  IMAGE,
};
export default defaultValue;
