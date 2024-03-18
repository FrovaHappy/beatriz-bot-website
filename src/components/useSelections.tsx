"use client";
import React, { useState } from "react";
import style from "./Selections.module.scss";
import inputStyle from "./Input.module.scss";
import IconChevronDown from "@/app/icons/IconChevronDown";
import { calculatePercents } from "@/utils/getPadding";
import MaskInput, { OptionsMaskInput } from "./MaskInput";
import { InputExport } from "@/types/types";

interface Options {
  id: string;
  icon?: (p: React.AllHTMLAttributes<any>) => React.ReactNode;
  title: string;
}
interface Props extends OptionsMaskInput {
  idSelect: string;
  values: Options[];
}

export default function useSelections(
  props: Props
): InputExport<Options | undefined> {
  const { title, width, idSelect, values, height = "2rem" } = props;
  const [value, setValue] = useState(values.find((v) => v.id === idSelect));
  const [show, setShow] = useState(false);
  const Icon = value?.icon;
  const ICONS_STYLE: React.CSSProperties = {
    height: calculatePercents(height, 0.7),
    aspectRatio: "1/1",
    flexShrink: "0",
  };
  const Select = (
    <MaskInput
      options={{ height, width, title }}
      onClick={() => setShow(!show)}
    >
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
    </MaskInput>
  );

  return [value, Select];
}
