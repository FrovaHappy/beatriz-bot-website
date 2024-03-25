"use client";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import React, { useEffect, useState } from "react";
import { Image, Text, Name, Icon } from "@/types/Canvas.types";
import style from "./Shapes.module.scss";
import Shape from "./Shape";
import { useCanvasCtx, useShapeIdCtx, useShapeModifyCtx } from "@/app/context";
import { addIdOfLayers } from "@/app/canvasParser";
type Shape = Partial<Image & Text & Name & Icon> & { id: number };

export default function Shapes() {
  const [canvas, setCanvas] = useCanvasCtx();
  const [shapeModify] = useShapeModifyCtx();
  const [list, setList] = useState(addIdOfLayers(canvas).layers);
  useEffect(() => {
    setList(canvas.layers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shapeModify]);
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setList((shape) => {
        const oldIndex = shape.findIndex((person) => person.id === active.id);
        const newIndex = shape.findIndex((person) => person.id === over?.id);
        const listMoved = arrayMove(shape, oldIndex, newIndex);
        console.log(listMoved);
        setCanvas({ ...canvas, layers: listMoved });
        return arrayMove(shape, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <ul className={style.content}>
        <SortableContext items={list} strategy={verticalListSortingStrategy}>
          {list.map((shape) => (
            <Shape
              key={shape.id}
              id={shape.id}
              icon={shape.type!}
              title={
                shape.shape ??
                shape.content ??
                shape.nameType ??
                `${shape.width} x ${shape.height}`
              }
              image={shape.img}
            />
          ))}
        </SortableContext>
      </ul>
    </DndContext>
  );
}
