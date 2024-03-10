"use client";
import React, { useEffect } from "react";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { Image, Text, Name, Icon } from "@/types/Canvas.types";
import "@/styles/Shapes.style.css";
import Shape from "./Shape";
import { useCanvasCtx } from "@/app/context";
import { addIdOfLayers } from "@/app/canvasParser";
type Shape = Partial<Image & Text & Name & Icon> & {id: number};

export default function Shapes() {
  const [canvas, setCanvas] = useCanvasCtx()
  const [parent, tapes] = useDragAndDrop<HTMLUListElement, Shape>(addIdOfLayers(canvas).layers);
  useEffect(()=>{
    if (canvas.layers === tapes) return
    setCanvas({...canvas, layers: tapes})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tapes])
  return (
    <ul ref={parent}>
      {tapes.map((tape, i) => (
        <Shape
          key={tape.id}
          icon={tape.type!}
          title={tape.shape ?? tape.content ?? tape.nameType ?? `${tape.width} x ${tape.height}`}
          image={tape.img}
        />
      ))}
    </ul>
  );
}
