"use client";
import React from "react";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { Image, Text, Name, Icon } from "@/types/Canvas.types";
import "@/styles/Shapes.style.css";
import Shape from "./Shape";
type Shape = Partial<Image & Text & Name & Icon> & {id: number};
interface Props {
  shapes: Array<Shape>;
}

export default function Shapes({ shapes }: Props) {
  const [parent, tapes] = useDragAndDrop<HTMLUListElement, Shape>(shapes);
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
