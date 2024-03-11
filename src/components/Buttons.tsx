"use client";

import {  useState } from "react";
export default function Buttons( state = false, text = "button") {
  const [value, setValue] = useState(state);

  const Button = <button onClick={() => setValue(!value)}>{text}</button>;

  return [value, Button];
}
