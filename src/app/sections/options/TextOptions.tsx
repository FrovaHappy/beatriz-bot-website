import { useCanvasCtx, useShapeModifyCtx } from "@/app/context";
import useInputNumber from "@/components/useInputNumber";
import useInputText from "@/components/useInputText";
import useSelections from "@/components/useSelections";
import { Layer, Text } from "@/types/Canvas.types";
import { useEffect } from "react";
import style from "./index.module.scss";
const LIMIT_CANVAS = 1024;
const HEIGHT = `2.625rem`;
export default function TextOptions({ shape }: { shape: Text }) {
  const [canvas, setCanvas] = useCanvasCtx();
  const [, setShapeModify] = useShapeModifyCtx();
  const [x, xInput] = useInputNumber({
    defaultValue: `${shape.x}`,
    step: 1,
    min: 0,
    max: LIMIT_CANVAS,
    height: HEIGHT,
    title: "X",
  });
  const [y, yInput] = useInputNumber({
    defaultValue: `${shape.y}`,
    step: 1,
    min: 0,
    max: LIMIT_CANVAS,
    height: HEIGHT,
    title: "y",
  });
  const [family, familySelector] = useSelections({
    idSelect: shape.family,
    height: HEIGHT,
    title: "y",
    values: [
      { id: "Roboto", title: "Roboto" },
      { id: "Inter", title: "Inter" },
      { id: "Laton", title: "Laton" },
    ],
  });
  const [content, contentInput] = useInputText({
    defaultValue: shape.content,
    regexArray: [
      {
        regex: /^[\w\W]{0,100}$/,
        msg: "El largo del texto supera los 100 caracteres ",
      },
    ],
    height: HEIGHT,
    title: "Content",
  });
  useEffect(() => {
    shape.x = parseFloat(x ?? "") ?? shape.x;
    shape.y = parseFloat(y ?? "") ?? shape.y;
    shape.family = family?.id ?? shape.family;
    shape.content = content ?? shape.content;
    const s = shape as Layer;
    const layers = canvas.layers;
    canvas.layers = layers.map((l) => (l.id === s.id ? s : l));
    setCanvas(JSON.parse(JSON.stringify(canvas)));
    setShapeModify(s);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [x, y, family, content]);
  return (
    <>
      <h3 className={style.title}>Dimensiones</h3>
      {xInput}
      {yInput}
      <h3 className={style.title}>Texto</h3>
      {contentInput}
      {familySelector}
    </>
  );
}
