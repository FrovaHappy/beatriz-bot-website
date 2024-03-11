import { useRef, useState } from "react";
type Value = string | null;
type Reg = {
  regex: RegExp;
  msg: string;
};
interface Base {
  type: "text" | "number";
  defaultValue?: string;
  placeholder?: string;
}
interface InputText {
  regexArray: Reg[];
}
interface InputNumber {
  step: number;
  min: number;
  max: number;
}
interface Props extends Base {
  text?: InputText;
  number?: InputNumber;
}
const ERROR = {
  invalidText: "text type was specified but received number props",
  invalidNumber: "number type was specified but received text props",
  doubleCoincidence: "Collisions error in input, only one type can be used.",
};
export default function Input({
  text,
  number,
  type,
  defaultValue,
  placeholder,
}: Props) {
  const [value, setValue] = useState<Value>(null);
  const [msgError, setMsgError] = useState<Value>(null);

  if (type === "text" && number) throw new Error(ERROR.invalidText);
  if (type === "number" && text) throw new Error(ERROR.invalidNumber);
  if (text && number) throw new Error(ERROR.doubleCoincidence);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const m = e.target.value;
    if (number) {
      const test =
        Number.parseInt(m) < number.max && Number.parseInt(m) > number.min;
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
  const Component = (
    <div>
      <input
        type={type}
        step={number?.step}
        min={number?.min}
        max={number?.max}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
      />
      {msgError ? <span>{msgError}</span> : undefined}
    </div>
  );
  return [value, Component] as [value: Value, select: JSX.Element];
}
