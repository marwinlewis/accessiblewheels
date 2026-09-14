import { TranslationDictionary } from "../types";
import { DEFAULT_LOCALE } from "../languages";
import { en } from "./en";
import { hi } from "./hi";
import { bn } from "./bn";
import { ta } from "./ta";
import { te } from "./te";
import { mr } from "./mr";
import { gu } from "./gu";
import { kn } from "./kn";
import { ml } from "./ml";
import { ur } from "./ur";
import { pa } from "./pa";
import { or as oriya } from "./or";
import { as as assamese } from "./as";
import { mai, ne, kok, doi, sa, brx, sat, ks, sd, mni } from "./scheduled";

export const DICTIONARIES: Record<string, TranslationDictionary> = {
  en,
  hi,
  bn,
  ta,
  te,
  mr,
  gu,
  kn,
  ml,
  ur,
  pa,
  or: oriya,
  as: assamese,
  mai,
  ne,
  kok,
  doi,
  sa,
  brx,
  sat,
  ks,
  sd,
  mni,
};

export function getDictionary(locale?: string): TranslationDictionary {
  if (!locale) return en;
  const key = locale.toLowerCase();
  return DICTIONARIES[key] || en;
}

export { en, hi, bn, ta, te, mr, gu, kn, ml, ur, pa };
