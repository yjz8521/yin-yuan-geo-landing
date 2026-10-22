import data from "@/content/engines.json";
import type { Locale } from "./locales";

export type Engine = (typeof data.engines)[number];
export const engines: Engine[] = data.engines;

export const liveEngines = engines.filter((e) => e.live);
export const comingEngines = engines.filter((e) => !e.live);

export function engineName(l: Locale, e: Engine) {
  return l === "en" ? e.en : l === "zh-hant" ? e.hant : e.zh;
}

function list(l: Locale, es: Engine[]) {
  const names = es.map((e) => engineName(l, e));
  if (l !== "en") return names.join("、");
  return names.length < 2 ? names.join("") : `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;
}

/** Replace engine-status tokens in already-translated copy, so flipping `live` in engines.json updates every page. */
export function fillEngines(l: Locale, s: string) {
  if (!s.includes("{")) return s;
  return s
    .replaceAll("{LIVE}", list(l, liveEngines))
    .replaceAll("{COMING_CN}", list(l, comingEngines.filter((e) => e.region === "cn")))
    .replaceAll("{COMING_GLOBAL}", list(l, comingEngines.filter((e) => e.region === "global")));
}
