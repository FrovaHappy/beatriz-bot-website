import { InputExport } from "@/types/types";
import { useState } from "react";
import MaskInput, { OptionsMaskInput } from "./MaskInput";
type State = string | undefined;
interface Props extends OptionsMaskInput {}
export default function useColorsInput({
  height,
  title,
  width,
}: Props): InputExport<State> {
  const [color, setColor] = useState<State>("#000000");
  const handlerOnBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setColor(value);
  };
  const Component = (
    <MaskInput options={{ title, height, width }}>
      <input
        type="color"
        defaultValue={color}
        onChange={handlerOnBlur}
        style={{ width: "100%", height: "100%", minWidth: "2rem" }}
      />
    </MaskInput>
  );

  return [color, Component];
}
