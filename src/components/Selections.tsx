"use client";
import React, { useState } from "react";
import style from "./Selections.module.scss";
import inputStyle from "./Input.module.scss";
import IconChevronDown from "@/app/icons/IconChevronDown";
import { getFontSize, getHeightIcons, getPadding } from "@/utils/getPadding";

interface Values {
  id: string;
  icon?: (p: React.AllHTMLAttributes<any>) => React.ReactNode;
  title: string;
}
interface Props {
  title?: string;
  idSelect: string;
  height?: `${number}px` | `${number}rem`;
  width?: `${number}px` | `${number}rem` | "auto";
  values: Values[];
}

export default function Selections({
  title,
  width = "auto",
  idSelect,
  values,
  height = "1.5625rem",
}: Props) {
  const [value, setValue] = useState(values.find((v) => v.id === idSelect));
  const [show, setShow] = useState(false);
  const Icon = value?.icon;
  const ICONS_STYLE: React.CSSProperties = {
    height: getHeightIcons(height),
    aspectRatio: "1/1",
    flexShrink: "0",
  };
  const Select = (
    <div
      className={inputStyle.content}
      onClick={() => setShow(!show)}
      style={{
        height,
        width,
        padding: getPadding(height),
        fontSize: getFontSize(height),
      }}
    >
      {title ? (
        <>
          <span className={inputStyle.title}>{title}</span>{" "}
          <span className={inputStyle["title--line"]} />
        </>
      ) : undefined}

      {Icon ? <Icon style={ICONS_STYLE} /> : undefined}
      <span className={inputStyle.props}>
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
              className={`${inputStyle.props} ${style.value} ${
                value?.id === v.id ? style["value--active"] : ""
              }`}
              style={{ height }}
            >
              {IconItem ? <IconItem style={ICONS_STYLE} /> : undefined}
              {v.title}
            </div>
          );
        })}
      </div>
    </div>
  );

  return [value, Select] as [value: Values | undefined, select: JSX.Element];
}
