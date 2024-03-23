import { useCanvasCtx, useShapeModifyCtx } from "@/app/context";
import { Name, Text, Image, Icon } from "@/types/Canvas.types";
import defaultValue from "./defaultsValues";

export default function NewShape() {
  const [canvas, setCanvas] = useCanvasCtx();
  const [, setShapeModify] = useShapeModifyCtx();

  function onClick(defaultValue: Text | Name | Image | Icon) {
    return () => {
      const layer = { ...defaultValue, id: Date.now() };
      canvas.layers.push(layer);
      setShapeModify(layer);
      setCanvas({ ...canvas });
    };
  }
  return (
    <div>
      <span>{canvas.layers.length} / 10</span>
      <div>
        <button onClick={onClick(defaultValue.TEXT)}> + text </button>
        <button onClick={onClick(defaultValue.NAME)}> + name </button>
        <button onClick={onClick(defaultValue.IMAGE)}> + image </button>
        <button onClick={onClick(defaultValue.ICON)}> + icon </button>
      </div>
    </div>
  );
}
