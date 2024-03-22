/* eslint-disable react/jsx-key */
import { useCanvasCtx, useShapeModifyCtx } from "@/app/context";
import style from "./index.module.scss";
import { Image, Layer } from "@/types/Canvas.types";
import { cloneElement, useEffect } from "react";
import { HEIGHT, LIMIT_CANVAS, WIDTH_LARGE, WIDTH_SHORT } from ".";
import useInputNumber from "@/components/useInputNumber";
import UploadImage from "@/components/UploadImage";

export default function ImageOptions({ shape }: { shape: Image }) {
  const [canvas, setCanvas] = useCanvasCtx();
  const [, setShapeModify] = useShapeModifyCtx();

  const options = {
    img: UploadImage({ defaultValue: shape.img, width: WIDTH_LARGE }),
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
  };
  const values = Object.keys(options).map(
    (key) => options[key as keyof Omit<Image, "type">][0]
  );
  const components = Object.keys(options).map(
    (key) => options[key as keyof Omit<Image, "type">][1]
  );
  useEffect(() => {
    let s = shape as Layer;
    s = {
      img: options.img[0],
      height: options.height[0],
      width: options.width[0],
      x: options.x[0],
      y: options.y[0],
      type: s.type,
      id: s.id,
    };

    const layers = canvas.layers;
    canvas.layers = layers.map((l) => (l.id === s.id ? s : l));
    setCanvas(JSON.parse(JSON.stringify(canvas)));
    setShapeModify(s);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, values);

  return <>{components.map((c, i) => cloneElement(c, { key: i }))}</>;
}
