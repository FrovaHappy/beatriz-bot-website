"use client";
import React, { useState } from "react";
import style from "./Selections.module.scss";
import inputStyle from "./Input.module.scss";
import IconChevronDown from "@/app/icons/IconChevronDown";

interface Values {
  id: string;
  icon?: (p: React.AllHTMLAttributes<any>) => React.ReactNode;
  title: string;
}
interface Props {
  title?: string;
  idSelect: string;
  height?: `${number}px` | `${number}rem`;
  values: Values[];
}
const ICONS_STYLE: React.CSSProperties = {
  height: "100%",
  aspectRatio: "1/1",
  flexShrink: "0",
};
export default function Selections({
  title,
  idSelect,
  values,
  height = "1.5625rem",
}: Props) {
  const [value, setValue] = useState(values.find((v) => v.id === idSelect));
  const [show, setShow] = useState(false);
  const Icon = value?.icon;
  const Select = (
    <div
      className={inputStyle.content}
      onClick={() => setShow(!show)}
      style={{ height }}
    >
      {title ? <span className={inputStyle.title}>{title}</span> : undefined}

      <span className={inputStyle.props}>
        {Icon ? <Icon style={{ height }} /> : undefined}
        {value?.title ?? "selecciona..."}
      </span>
      <IconChevronDown style={ICONS_STYLE} />

      <div className={`${style.values} + ${show ? style.show : ""}`}>
        {values.map((v) => {
          const IconItem = v.icon;
          return (
            <div
              key={v.id}
              onClick={() => setValue(v)}
              className={`${style.value} ${value?.id === v.id ? "active" : ""}`}
              style={{ height }}
            >
              {IconItem ? <IconItem style={ICONS_STYLE} /> : undefined}
              <p>{v.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );

  return [value, Select] as [value: Values | undefined, select: JSX.Element];
}
