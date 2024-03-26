/* eslint-disable react/jsx-key */
import { useCanvasCtx, useShapeModifyCtx } from "@/app/context";
import style from "./index.module.scss";
import { Image, Layer, Name } from "@/types/Canvas.types";
import { cloneElement, useEffect } from "react";
import { HEIGHT, LIMIT_CANVAS, WIDTH_LARGE, WIDTH_SHORT } from ".";
import useInputNumber from "@/components/useInputNumber";
import UploadImage from "@/components/UploadImage";
import useSelections from "@/components/useSelections";
import useColorsInput from "@/components/useColorsInput";

export default function NameOptions({ shape }: { shape: Name }) {
  const [canvas, setCanvas] = useCanvasCtx();
  const [, setShapeModify] = useShapeModifyCtx();

  const options = {
    title_dimensions: [, <h3 className={style.title}> Dimensiones </h3>],
    x: useInputNumber({
      defaultValue: `${shape.x}`,
      height: HEIGHT,
      title: 'X',
      placeholder: shape.x.toString(),
      width: WIDTH_SHORT,
      step: 1,
      min: 0,
      max: LIMIT_CANVAS
    }),
    y: useInputNumber({
      defaultValue: `${shape.y}`,
      height: HEIGHT,
      title: 'Y',
      placeholder: shape.y.toString(),
      width: WIDTH_SHORT,
      step: 1,
      min: 0,
      max: LIMIT_CANVAS
    }),
    title_text: [, <h3 className={style.title}> Texto </h3>],
    nameType: useSelections({
      idSelect: shape.nameType,
      height: HEIGHT,
      title: 'Type',
      width: WIDTH_LARGE,
      values: [
        { id: 'username', title: 'User Name' },
        { id: 'id', title: 'Id' },
        { id: 'globalName', title: 'Global Name' }
      ]
    }),
    family: useSelections({
      idSelect: shape.family ?? 'Roboto',
      height: HEIGHT,
      title: 'Family',
      width: WIDTH_LARGE,
      values: [
        { id: 'Roboto', title: 'Roboto' },
        { id: 'DancingScript', title: 'DancingScript' },
        { id: 'Inter', title: 'Inter' },
        { id: 'Karla Italic', title: 'Karla Italic' },
        { id: 'Karla', title: 'Karla' },
        { id: 'Lato', title: 'Lato' },
        { id: 'Nunito Italic', title: 'Nunito Italic' },
        { id: 'Nunito', title: 'Nunito' }
      ]
    }),
    align: useSelections<CanvasTextAlign>({
      title: 'Align',
      idSelect: shape.align ?? 'start',
      height: HEIGHT,
      width: WIDTH_LARGE,
      values: [
        {
          id: 'start',
          title: 'Start'
        },
        {
          id: 'center',
          title: 'Center'
        },
        {
          id: 'end',
          title: 'End'
        }
      ]
    }),
    baseline: useSelections<CanvasTextBaseline>({
      idSelect: shape.baseline,
      height: HEIGHT,
      title: 'Baseline',
      width: WIDTH_LARGE,
      values: [
        { id: 'top', title: 'Top' },
        { id: 'hanging', title: 'Hanging' },
        { id: 'middle', title: 'Middle' },
        { id: 'alphabetic', title: 'Alphabetic' },
        { id: 'ideographic', title: 'Ideographic' },
        { id: 'bottom', title: 'Bottom' }
      ]
    }),
    color: useColorsInput({
      defaultValue: shape.color,
      height: HEIGHT,
      width: WIDTH_SHORT,
      title: 'Color'
    }),
    limitLetters: useInputNumber({
      max: 250,
      min: 1,
      step: 1,
      defaultValue: `${shape.limitLetters}`,
      height: HEIGHT,
      title: 'Limit',
      width: WIDTH_SHORT
    }),
    weight: useInputNumber({
      defaultValue: `${shape.weight}`,
      height: HEIGHT,
      title: 'Weight',
      placeholder: shape.weight.toString(),
      width: WIDTH_SHORT,
      step: 50,
      min: 0,
      max: 1000
    }),
    size: useInputNumber({
      defaultValue: `${shape.size}`,
      height: HEIGHT,
      title: 'Size',
      placeholder: shape.size.toString(),
      width: WIDTH_SHORT,
      step: 1,
      min: 0,
      max: LIMIT_CANVAS
    })
  }
  const values = Object.keys(options).map(
    (key) => options[key as keyof Omit<Name, "type">][0]
  );
  const components = Object.keys(options).map(
    (key) => options[key as keyof Omit<Name, "type">][1]
  );
  useEffect(() => {
    let s = shape as Layer;
    s = {
      x: options.x[0],
      y: options.y[0],
      type: s.type,
      id: s.id,
      align: options.align[0]?.id,
      baseline: options.baseline[0]?.id,
      color: options.color[0],
      family: options.family[0]?.id,
      limitLetters: options.limitLetters[0],
      nameType: options.nameType[0]?.id,
      weight: options.weight[0],
      size: options.size[0],
    };

    const layers = canvas.layers;
    canvas.layers = layers.map((l) => (l.id === s.id ? s : l));
    setCanvas(JSON.parse(JSON.stringify(canvas)));
    setShapeModify(s);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, values);

  return <>{components.map((c, i) => cloneElement(c, { key: i }))}</>;
}
