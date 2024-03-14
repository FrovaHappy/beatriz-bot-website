import { useState } from "react";
import inputStyle from "./Input.module.scss";
import { getPadding } from "@/utils/getPadding";
type Value = string | null;
type Reg = {
  regex: RegExp;
  msg: string;
};
interface InputText {
  defaultValue?: string;
  regexArray: Reg[];
}
interface Props extends InputText {
  height?: `${number}px` | `${number}rem`;
  title?: string;
  placeholder?: string;
}
export default function useInputText(props: Props) {
  const {
    title,
    regexArray,
    defaultValue,
    placeholder,
    height = "1.5625rem",
  } = props;

  const [value, setValue] = useState<Value>(defaultValue || null);
  const [msgError, setMsgError] = useState<Value>(null);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const m = e.target.value || defaultValue || "";

    for (const r of regexArray) {
      const test = r.regex.test(m);
      if (test) continue;
      setMsgError(r.msg);
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
        type="text"
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
