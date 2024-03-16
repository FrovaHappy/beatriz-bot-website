/* eslint-disable @next/next/no-img-element */
"use client";
import style from "./Shape.module.scss";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import IconAt from "@/app/icons/IconAt";
import IconPhoto from "@/app/icons/IconPhoto";
import IconTextResize from "@/app/icons/IconTextResize";
import IconUserSquare from "@/app/icons/IconUserSquare";
import IconIconsOff from "@/app/icons/IconIconsOff";
import { useShapeIdCtx } from "@/app/context";

interface Props {
  icon: "image" | "text" | "name" | "icon" | string;
  id: number;
  title: string;
  image?: string;
}
const icons: Record<
  string,
  (p: React.SVGProps<SVGSVGElement>) => React.JSX.Element
> = {
  image: IconPhoto,
  icon: IconUserSquare,
  text: IconTextResize,
  name: IconAt,
};
export default function Shape({ image, icon, title, id }: Props) {
  const [shapeId] = useShapeIdCtx()
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const imgDefault =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
  const dndStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const Icon = icons[icon] ?? IconIconsOff;
  return (
    <li
      style={dndStyle}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`${style.shape} ${shapeId === id ? style.shape__select : ''}`}
    >
      <Icon className={style.shape__icon} />
      <h3 className={style.shape__title}>{title}</h3>
      <img
        src={image ?? imgDefault}
        alt="imagen del la capa"
        className={style.shape__image}
      />
    </li>
  );
}
