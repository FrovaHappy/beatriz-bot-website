"use client";

import { useState } from "react";
import style from "./switch.module.scss";

export default function useSwitch(state = false) {
  const [value, setValue] = useState(state);

  const Button = (
    <div className={style.container}>
      <input
        type="checkbox"
        onClick={() => setValue(!value)}
        defaultChecked={state}
        className={style.checkbox}
        id="checkbox"
      />
      <label className={style.switch} htmlFor="checkbox">
        <span className={style.slider}></span>
      </label>
    </div>
  );

  return [value, Button];
}
