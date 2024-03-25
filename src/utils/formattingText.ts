import { User } from "@/types/Canvas.types";

const userRules = {
  userName: "<user_name>",
  userGlobal: "<user_global>",
  userCount: "<user_count>",
  userId: "<user_id>",
};
const internalRules = {
  slot0: "<slot_0>",
  slot1: "<slot_1>",
  slot2: "<slot_2>",
  slot3: "<slot_3>",
  slot4: "<slot_4>",
  slot5: "<slot_5>",
  slot6: "<slot_6>",
  slot7: "<slot_7>",
  slot8: "<slot_8>",
  slot9: "<slot_9>",
};

const rules = { ...userRules, ...internalRules };
export type UserRules = typeof userRules;
export type InternalRules = typeof internalRules;
type Rules = UserRules & InternalRules;

export function userFormatting(str: string, user: User): string {
  str = formattingText(str, {
    userCount: user.count?.toString(),
    userGlobal: user.username,
    userId: user.id,
    userName: user.username,
  });
  return str;
}

export default function formattingText(
  str: string,
  formats: Partial<Rules>
): string {
  const formatsKeys = Object.keys(formats) as Array<keyof Rules>;
  for (const fk of formatsKeys) {
    str = str.replaceAll(rules[fk], formats[fk] ?? "");
  }
  // Formatting strings with Rules requires
  const rulesRequired = {
    "\\n": "\n",
    "\\t": "\t",
    "\\r": "\r",
  };
  const rulesReqKeys = Object.keys(rulesRequired) as Array<
    keyof typeof rulesRequired
  >;
  for (const rrk of rulesReqKeys) {
    str = str.replaceAll(rrk, rulesRequired[rrk]);
  }
  return str;
}
