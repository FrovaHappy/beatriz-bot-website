import { useCanvasCtx, useShapeModifyCtx } from "@/app/context";
import useInputNumber from "@/components/useInputNumber";
import useInputText from "@/components/useInputText";
import useSelections from "@/components/useSelections";
import { Layer, Text } from "@/types/Canvas.types";
import { useEffect } from "react";
import style from "./index.module.scss";
import useColorsInput from "@/components/useColorsInput";
import { HEIGHT, LIMIT_CANVAS, WIDTH_LARGE, WIDTH_SHORT } from ".";
export default function TextOptions({ shape }: { shape: Text }) {
  const [canvas, setCanvas] = useCanvasCtx();
  const [layer, setShapeModify] = useShapeModifyCtx();
  const [x, xInput] = useInputNumber({
    defaultValue: `${shape.x}`,
    step: 1,
    min: 0,
    max: LIMIT_CANVAS,
    height: HEIGHT,
    title: "X",
    width: WIDTH_SHORT,
  });
  const [y, yInput] = useInputNumber({
    defaultValue: `${shape.y}`,
    step: 1,
    min: 0,
    max: LIMIT_CANVAS,
    height: HEIGHT,
    title: "y",
    width: WIDTH_SHORT,
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
    width: WIDTH_LARGE,
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
    width: WIDTH_LARGE,
  });
  const [size, sizeInput] = useInputNumber({
    max: LIMIT_CANVAS,
    min: 8,
    step: 1,
    defaultValue: `${shape.size}`,
    height: HEIGHT,
    title: "Size",
    width: WIDTH_SHORT,
  });
  const [color, colorInput] = useColorsInput({
    height: HEIGHT,
    title: "Color",
    width: WIDTH_SHORT,
    defaultValue: shape.color,
  });
  const [weight, weightInput] = useInputNumber({
    max: 1000,
    min: 1,
    step: 1,
    defaultValue: `${shape.weight}`,
    height: HEIGHT,
    title: "Weight",
    width: WIDTH_SHORT,
  });
  const [limitLetters, limitLettersInput] = useInputNumber({
    max: 250,
    min: 1,
    step: 1,
    defaultValue: `${shape.limitLetters}`,
    height: HEIGHT,
    title: "Limit",
    width: WIDTH_SHORT,
  });
  const [align, alignSelector] = useSelections<CanvasTextAlign>({
    idSelect: shape.align,
    height: HEIGHT,
    title: "Align",
    values: [
      { id: "left", title: "left" },
      { id: "center", title: "center" },
      { id: "right", title: "right" },
    ],
    width: WIDTH_SHORT,
  });
  const [baseline, baselineSelector] = useSelections<CanvasTextBaseline>({
    idSelect: shape.baseline,
    height: HEIGHT,
    title: "Baseline",
    values: [
      { id: "top", title: "top" },
      { id: "middle", title: "middle" },
      { id: "bottom", title: "bottom" },
    ],
    width: WIDTH_SHORT,
  });
  useEffect(() => {
    // Dimensions
    shape.x = x ?? shape.x;
    shape.y = y ?? shape.y;
    // Text
    shape.family = family?.id ?? shape.family;
    shape.content = content ?? shape.content;
    shape.size = size ?? shape.size;
    shape.weight = weight ?? shape.weight;
    shape.color = color ?? shape.color;
    shape.limitLetters = limitLetters ?? shape.limitLetters;
    shape.baseline = baseline?.id ?? shape.baseline;
    shape.align = align?.id ?? shape.align;
    const s = shape as Layer;
    const layers = canvas.layers;
    canvas.layers = layers.map((l) => (l.id === s.id ? s : l));
    setCanvas(JSON.parse(JSON.stringify(canvas)));
    setShapeModify(s);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    x,
    y,
    family,
    content,
    size,
    weight,
    color,
    limitLetters,
    baseline,
    align,
  ]);
  return (
    <>
      <h3 className={style.title}>Dimensiones</h3>
      {xInput}
      {yInput}
      <h3 className={style.title}>Texto</h3>
      {contentInput}
      {familySelector}
      {sizeInput}
      {colorInput}
      {weightInput}
      {limitLettersInput}
      {alignSelector}
      {baselineSelector}
    </>
  )
}
