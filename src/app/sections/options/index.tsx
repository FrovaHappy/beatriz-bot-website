import { useCanvasCtx, useShapeIdCtx } from "@/app/context";
import TextOptions from "./TextOptions";
import { Text } from "@/types/Canvas.types";
import { HtmlHTMLAttributes, PropsWithChildren } from "react";
import style from "./index.module.scss";
import GeneralOptions from "./GeneralOptions";

export const LIMIT_CANVAS = 1024;
export const WIDTH_LARGE = "20rem";
export const WIDTH_SHORT = "9.43rem";
export const HEIGHT = `2.625rem`;
function OptionsContent({
  children,
  ...props
}: PropsWithChildren<HtmlHTMLAttributes<any>>) {
  return (
    <div {...props} className={style.content}>
      {children}
    </div>
  );
}
export default function Options() {
  const [canvas] = useCanvasCtx();
  const [shapeId] = useShapeIdCtx();
  const shape = canvas.layers.find((l) => l.id === shapeId);
  switch (shape?.type ?? "") {
    case "text":
      return (
        <OptionsContent>
          <TextOptions shape={shape as Text} />
        </OptionsContent>
      );
    default:
      return (
        <OptionsContent>
          <GeneralOptions />
        </OptionsContent>
      );
  }
}
