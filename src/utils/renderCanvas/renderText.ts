import { Base, Text, TextBase, User } from "@/types/Canvas.types";
import { userFormatting } from "../formattingText";

export function renderText(
  text: Text,
  ctx: CanvasRenderingContext2D,
  user: User,
  base: Base & TextBase
) {
  const {
    x,
    y,
    size,
    family,
    weight,
    limitLetters,
    content,
    align,
    baseline,
    color,
  } = text;
  let textContent = userFormatting(content, user);
  ctx.font = `${weight} ${size}px ${family}`;
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
  ctx.fillStyle = color ?? base.color;

  let lengthLetters = ctx.measureText(textContent);
  while (limitLetters < lengthLetters.width && limitLetters !== 0) {
    textContent = textContent.slice(0, -1);
    lengthLetters = ctx.measureText(textContent);
  }

  ctx.fillText(textContent, x, y);
}