import { useState } from "react";
import inputStyle from "./Input.module.scss";
import { getPadding } from "@/utils/getPadding";
type Value = string | null;

interface InputNumber {
  defaultValue?: `${number}`;
  step: number;
  min: number;
  max: number;
}
interface Props extends InputNumber {
  height?: `${number}px` | `${number}rem`;
  title?: string;
  placeholder?: string;
}

export default function useInputNumber(props: Props) {
  const {
    title,
    max,
    min,
    step,
    defaultValue,
    placeholder,
    height = "1.5625rem",
  } = props;

  const [value, setValue] = useState<Value>(defaultValue || null);
  const [msgError, setMsgError] = useState<Value>(null);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const m = e.target.value || defaultValue || "";
    const test = Number.parseInt(m) <= max && Number.parseInt(m) >= min;
    if (!test) {
      setMsgError(`el numero debe ser mayor a ${min} o menor a ${max}.`);
      return;
    }
    if (Number.parseFloat(m) % step !== 0) {
      setMsgError(`el numero debe ser divisible por ${step}.`);
      return;
    }
    setMsgError(null);
    setValue(m);
  };
  const onBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    if (e.target.value === "") e.target.value = defaultValue || "";
  };
  const contentClassName = `${inputStyle.content} ${
    msgError ? inputStyle.error : ""
  }`;
  const contentStyle = { height, padding: getPadding(height) };

  const Component = (
    <div className={contentClassName} style={contentStyle}>
      {title ? (
        <>
          <span className={inputStyle.title}>{title}</span>{" "}
          <span className={inputStyle["title--line"]} />
        </>
      ) : undefined}
      <input
        className={inputStyle.props}
        type="number"
        step={step}
        min={min}
        max={max}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      {msgError ? (
        <span className={inputStyle.error}>{msgError}</span>
      ) : undefined}
    </div>
  );
  return [value, Component] as [value: Value, select: JSX.Element];
}
