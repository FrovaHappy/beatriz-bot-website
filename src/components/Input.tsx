import { useState } from "react";
import inputStyle from "./Input.module.scss";
type Value = string | null;
type Reg = {
  regex: RegExp;
  msg: string;
};
interface InputText {
  defaultValue?: string;
  regexArray: Reg[];
}
interface InputNumber {
  defaultValue?: `${number}`;
  step: number;
  min: number;
  max: number;
}
interface Props {
  height?: `${number}px` | `${number}rem`;
  title?: string;
  type: "text" | "number";
  placeholder?: string;
  text?: InputText;
  number?: InputNumber;
}
const ERROR = {
  invalidText: "text type was specified but received number props",
  invalidNumber: "number type was specified but received text props",
  doubleCoincidence: "Collisions error in input, only one type can be used.",
};
export default function Input(props: Props) {
  const {
    title,
    text,
    number,
    type,
    placeholder,
    height = "1.5625rem",
  } = props;

  const [value, setValue] = useState<Value>(null);
  const [msgError, setMsgError] = useState<Value>(null);

  if (type === "text" && number) throw new Error(ERROR.invalidText);
  if (type === "number" && text) throw new Error(ERROR.invalidNumber);
  if (text && number) throw new Error(ERROR.doubleCoincidence);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const m =
      e.target.value || number?.defaultValue || text?.defaultValue || "";
    if (number) {
      const test =
        Number.parseInt(m) <= number.max && Number.parseInt(m) >= number.min;
      if (!test) {
        setMsgError(
          `el numero debe ser mayor a ${number.min} o menor a ${number.max}.`
        );
        return;
      }
      if (Number.parseFloat(m) % number.step !== 0) {
        setMsgError(`el numero debe ser divisible por ${number.step}.`);
        return;
      }
    }
    if (text) {
      for (const r of text.regexArray) {
        const test = r.regex.test(m);
        if (test) continue;
        setMsgError(r.msg);
        return;
      }
    }
    setMsgError(null);
    setValue(m);
  };
  const onBlur:React.FocusEventHandler<HTMLInputElement> =  (e) => {
    e.preventDefault()
    if (e.target.value === '') e.target.value = number?.defaultValue || text?.defaultValue || '';
  }
  const Component = (
    <div
      className={`${inputStyle.content} ${msgError ? inputStyle.error : ""}`}
      style={{ height }}
    >
      {title ? <span className={inputStyle.title}>{title}</span> : undefined}
      <input
        className={inputStyle.props}
        type={type}
        step={number?.step}
        min={number?.min}
        max={number?.max}
        defaultValue={number?.defaultValue || text?.defaultValue}
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
