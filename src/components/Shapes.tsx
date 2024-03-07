"use client";
import React from "react";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { Image, Text, Name, Icon } from "@/types/Canvas.types";
import "@/styles/Shapes.style.css"
type Shape = Image | Text | Name | Icon;
interface Props {
  shapes: Array<Shape>;
}

export default function Shapes({ shapes }: Props) {
  const [parent, tapes] = useDragAndDrop<HTMLUListElement, Shape>(shapes);
  return (
    <ul ref={parent}>
      {tapes.map((tape, i) => (
        <li className='component' key={tape.type + i}>
          {tape.type + i}
        </li>
      ))}
    </ul>
  );
}
