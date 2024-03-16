"use client";
import { createContext, useContext, useEffect, useState } from "react";
import welcome from "./welcome.json";
import { Canvas, Layer } from "@/types/Canvas.types";
import { State } from "@/types/types";

const HomeContext = createContext<State<Canvas> | null>(null);
const ShapeIdContext = createContext<State<number | null> | null>(null);
const ShapeModifyContext = createContext<State<Layer | null> | null>(null)

export function useCanvasCtx() {
  const c = useContext(HomeContext);
  if (!c)
    throw new Error("this Canvas context is not available in this instance");
  return c;
}
export function useShapeIdCtx() {
  const c = useContext(ShapeIdContext);
  if (!c)
    throw new Error("this Canvas context is not available in this instance");
  return c;
}
export function useShapeModifyCtx() {
  const c = useContext(ShapeModifyContext);
  if (!c)
    throw new Error("this Canvas context is not available in this instance");
  return c;
}

export default function Context({ children }: React.PropsWithChildren) {
  const [canvas, setCanvas] = useState(null as unknown as Canvas);
  const [shapeId, setShapeId] = useState<number | null>(null);
  const [shapeModify, setShapeModify] = useState<Layer | null>(null) 
  useEffect(() => {
    const restoreCanvas =
      JSON.parse(window.localStorage.getItem("canvas") ?? "null") ?? welcome;
    setCanvas(restoreCanvas);
  }, []);
  useEffect(() => {
    if (!canvas) return;
    window.localStorage.setItem("canvas", JSON.stringify(canvas));
  }, [canvas]);
  if (!canvas) return <>building component</>;
  return (
    <HomeContext.Provider value={[canvas, setCanvas]}>
      <ShapeIdContext.Provider value={[shapeId, setShapeId]}>
        <ShapeModifyContext.Provider value={[shapeModify, setShapeModify]} >
          {children}
        </ShapeModifyContext.Provider>
      </ShapeIdContext.Provider>
    </HomeContext.Provider>
  );
}
