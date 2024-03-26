import { useCanvasCtx } from "@/app/context";
import { User } from "@/types/Canvas.types";
import renderCanvas from "@/utils/renderCanvas";
import { useEffect, useRef } from "react";
const USER: User = {
  id: "2378364956435",
  username: "pedro_224",
  globalName: "Pedro Editor",
  count: 13,
  avatar: "https://imgur.com/GCcsX8J.png",
};
function loadImage(path: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(img)
    img.src = path
  })
}
export default function Canvas() {
  const [canvas] = useCanvasCtx();
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const ctx = ref.current?.getContext("2d");
    if (!ctx) return;
    const { layers, ...base } = canvas;
    renderCanvas(layers, base, USER, ctx, Path2D, loadImage)
  }, [canvas]);

  return (
    <canvas ref={ref} height={canvas.height} width={canvas.width}></canvas>
  );
}
