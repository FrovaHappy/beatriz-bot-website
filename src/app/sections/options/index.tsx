import { useCanvasCtx, useShapeIdCtx } from "@/app/context";
import TextOptions from "./TextOptions";
import { Text } from "@/types/Canvas.types";

export default function Options() {
  const [canvas, setCanvas] = useCanvasCtx();
  const [shapeId, setShapeId] = useShapeIdCtx();
  const shape = canvas.layers.find((l) => l.id === shapeId );
  if (!shape) return <>OpcionesGeneral</>
  if (shape.type === "text") return <TextOptions shape={shape as Text}/>
  return <>has ocurred error</>
}
