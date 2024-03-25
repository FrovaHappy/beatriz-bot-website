import { useShapeModifyCtx } from "@/app/context";
import TextOptions from "./TextOptions";
import { Icon, Image, Name, Text } from "@/types/Canvas.types";
import { HtmlHTMLAttributes, PropsWithChildren } from "react";
import style from "./index.module.scss";
import GeneralOptions from "./GeneralOptions";
import ImageOptions from "./ImageOptions";
import NameOptions from "./NameOptions";
import IconOptions from "./IconOptions";

export const LIMIT_CANVAS = 1024;
export const WIDTH_LARGE = "19.5rem";
export const WIDTH_SHORT = "9.43rem";
export const HEIGHT = `2.625rem`;
function OptionsContent({
  children,
  ...props
}: PropsWithChildren<HtmlHTMLAttributes<any>>) {
  return (
    <div {...props} className={style.content}>
      {children}
    </div>
  );
}
export default function Options() {
  const [shape] = useShapeModifyCtx();
  switch (shape?.type ?? "") {
    case "text":
      return (
        <OptionsContent>
          <TextOptions shape={shape as Text} />
        </OptionsContent>
      );
    case "image":
      return (
        <OptionsContent>
          <ImageOptions shape={shape as Image} />
        </OptionsContent>
      );
    case "name":
      return (
        <OptionsContent>
          <NameOptions shape={shape as Name} />
        </OptionsContent>
      );
    case "icon":
      return (
        <OptionsContent>
          <IconOptions shape={shape as Icon} />
        </OptionsContent>
      );
    default:
      return (
        <OptionsContent>
          <GeneralOptions />
        </OptionsContent>
      );
  }
}
