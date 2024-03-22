/* eslint-disable react/jsx-key */
import { useCanvasCtx, useShapeModifyCtx } from "@/app/context";
import style from "./index.module.scss";
import { Icon, Layer } from "@/types/Canvas.types";
import { cloneElement, useEffect } from "react";
import { HEIGHT, LIMIT_CANVAS, WIDTH_LARGE, WIDTH_SHORT } from ".";
import useInputNumber from "@/components/useInputNumber";
import useSelections from "@/components/useSelections";
import useColorsInput from "@/components/useColorsInput";

export default function IconOptions({ shape }: { shape: Icon }) {
  const [canvas, setCanvas] = useCanvasCtx();
  const [, setShapeModify] = useShapeModifyCtx();

  const options = {
    title_dimensions: [, <h3 className={style.title}> Dimensiones </h3>],
    x: useInputNumber({
      defaultValue: `${shape.x}`,
      height: HEIGHT,
      title: "X",
      placeholder: shape.x.toString(),
      width: WIDTH_SHORT,
      step: 1,
      min: 0,
      max: LIMIT_CANVAS,
    }),
    y: useInputNumber({
      defaultValue: `${shape.y}`,
      height: HEIGHT,
      title: "Y",
      placeholder: shape.y.toString(),
      width: WIDTH_SHORT,
      step: 1,
      min: 0,
      max: LIMIT_CANVAS,
    }),
    width: useInputNumber({
      defaultValue: `${shape.width}`,
      height: HEIGHT,
      title: "W",
      placeholder: shape.width.toString(),
      width: WIDTH_SHORT,
      step: 1,
      min: 0,
      max: LIMIT_CANVAS,
    }),
    height: useInputNumber({
      defaultValue: `${shape.height}`,
      height: HEIGHT,
      title: "H",
      placeholder: shape.height.toString(),
      width: WIDTH_SHORT,
      step: 1,
      min: 0,
      max: LIMIT_CANVAS,
    }),
    title_text: [, <h3 className={style.title}> Texto </h3>],
    shape: useSelections({
      idSelect: shape.shape,
      height: HEIGHT,
      title: "Forma",
      width: WIDTH_LARGE,
      values: [
        { id: "circle", title: "Circulo" },
        { id: "square", title: "Cuadrado" },
        { id: "square5", title: "Borde al 5%" },
        { id: "square10", title: "Borde al 10%" },
        { id: "square15", title: "Borde al 15%" },
        { id: "square20", title: "Borde al 20%" },
      ],
    }),
    color: useColorsInput({
      defaultValue: shape.color,
      height: HEIGHT,
      width: WIDTH_SHORT,
      title: "Color",
    }),
  };
  const values = Object.keys(options).map(
    (key) => options[key as keyof Omit<Icon, "type">][0]
  );
  const components = Object.keys(options).map(
    (key) => options[key as keyof Omit<Icon, "type">][1]
  );
  useEffect(() => {
    let s = shape as Layer;
    s = {
      x: options.x[0],
      y: options.y[0],
      type: s.type,
      id: s.id,
      color: options.color[0],
      height: options.height[0],
      width: options.width[0],
      shape: options.shape[0]?.id,
    };

    const layers = canvas.layers;
    canvas.layers = layers.map((l) => (l.id === s.id ? s : l));
    setCanvas(JSON.parse(JSON.stringify(canvas)));
    setShapeModify(s);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, values);

  return <>{components.map((c, i) => cloneElement(c, { key: i }))}</>;
}
