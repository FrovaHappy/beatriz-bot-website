import { useCanvasCtx, useShapeIdCtx } from "@/app/context";
import TextOptions from "./TextOptions";
import { Text } from "@/types/Canvas.types";
import { HtmlHTMLAttributes, PropsWithChildren } from "react";
import style from "./index.module.scss";
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
      return <OptionsContent>Opciones Generales</OptionsContent>;
  }
}
