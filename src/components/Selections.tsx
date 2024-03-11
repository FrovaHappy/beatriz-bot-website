"use client";
import React, { useState } from "react";
import style from "./Selections.module.scss";
import IconChevronDown from "@/app/icons/IconChevronDown";

interface Values {
  id: string;
  icon?: (p: React.AllHTMLAttributes<any>) => React.ReactNode;
  title: string;
}
interface Props {
  idSelect: string;
  height?: `${number}px` | `${number}rem`;
  values: Values[];
}

export default function Selections({
  idSelect,
  values,
  height = "1.5625rem",
}: Props) {
  const [value, setValue] = useState(values.find((v) => v.id === idSelect));
  const [show, setShow] = useState(false);
  const Icon = value?.icon;
  const Select = (
    <div
      className={style.main}
      onClick={() => setShow(!show)}
      style={{ height }}
    >
      <div className={style.selection}>
        <span className={style.value}>
          {Icon ? <Icon style={{ height }} /> : undefined}
          {value?.title ?? "selecciona un elemento."}
        </span>
        <IconChevronDown style={{ height: "100%", aspectRatio: "1/1", flexShrink: '0'}} />
      </div>
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
              {IconItem ? (
                <IconItem style={{ height: "100%", aspectRatio: "1/1" ,flexShrink: '0'}} />
              ) : undefined}
              <p>{v.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );

  return [value, Select] as [value: Values | undefined, select: JSX.Element];
}
