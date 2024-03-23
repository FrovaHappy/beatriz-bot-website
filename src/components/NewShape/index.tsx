import { useCanvasCtx, useShapeModifyCtx } from "@/app/context";
import { Name, Text, Image, Icon } from "@/types/Canvas.types";
import defaultValue from "./defaultsValues";
import style from "./index.module.scss";
import { useState } from "react";
import IconPlaylistAdd from "@/app/icons/IconPlaylistAdd";
import IconTextResize from "@/app/icons/IconTextResize";
import IconAt from "@/app/icons/IconAt";
import IconPhoto from "@/app/icons/IconPhoto";
import IconUserSquare from "@/app/icons/IconUserSquare";

export default function NewShape() {
  const [show, setShow] = useState(false);
  const [canvas, setCanvas] = useCanvasCtx();
  const [, setShapeModify] = useShapeModifyCtx();

  function onClick(defaultValue: Text | Name | Image | Icon) {
    return () => {
      const layer = { ...defaultValue, id: Date.now() };
      canvas.layers.push(layer);
      setShapeModify(layer);
      setCanvas({ ...canvas });
    };
  }
  const showOptions = show ? style.options : style.options__show;
  return (
    <div>
      <span>{canvas.layers.length} / 10</span>
      <div className={style.content}>
        <button className={style.newButton} onClick={() => setShow(!show)}>
          <IconPlaylistAdd />
          new Shape
        </button>
        <div className={showOptions}>
          <button onClick={onClick(defaultValue.TEXT)}>
            <IconTextResize />
            text
          </button>
          <button onClick={onClick(defaultValue.NAME)}>
            <IconAt /> name
          </button>
          <button onClick={onClick(defaultValue.IMAGE)}>
            <IconPhoto /> image
          </button>
          <button onClick={onClick(defaultValue.ICON)}>
            <IconUserSquare />
            icon
          </button>
        </div>
      </div>
    </div>
  );
}
