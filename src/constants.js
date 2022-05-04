/*eslint max-len: ["warn", { "code": 150}]*/

export const Factions = Object.freeze({
  a: Object.freeze({ name: "Albion", offset: 6 }),
  c: Object.freeze({ name: "Crimea", offset: 3, exclude: "3" }),
  f: Object.freeze({ name: "Fenris", offset: 8 }),
  n: Object.freeze({ name: "Nordic", offset: 1 }),
  p: Object.freeze({ name: "Polania", offset: 4 }),
  r: Object.freeze({ name: "Rusviet", offset: 2, exclude: "1" }),
  s: Object.freeze({ name: "Saxony", offset: 0 }),
  t: Object.freeze({ name: "Togawa", offset: 5 }),
  v: Object.freeze({ name: "Vesna", offset: 8 }),
});

export const PlayerMats = Object.freeze([
  Object.freeze({ name: "Industrial", num: "1" }),
  Object.freeze({ name: "Engineering", num: "2" }),
  Object.freeze({ name: "Militant", num: "2a" }),
  Object.freeze({ name: "Patriotic", num: "3" }),
  Object.freeze({ name: "Innovative", num: "3a" }),
  Object.freeze({ name: "Mechanical", num: "4" }),
  Object.freeze({ name: "Agricultural", num: "5" }),
]);

export const StructureBonuses = Object.freeze([
  Object.freeze({ name: "Adjacent Tunnels", from: "core" }),
  Object.freeze({ name: "Adjacent Lakes", from: "core" }),
  Object.freeze({ name: "Adjacent Encounters", from: "core" }),
  Object.freeze({ name: "On Tunnels", from: "core" }),
  Object.freeze({ name: "Straight Line", from: "core" }),
  Object.freeze({ name: "On Farms/Tundras", from: "core" }),

  Object.freeze({ name: "Adj. to Base/Factory", from: "modular" }),
  Object.freeze({ name: "Adj. to Same Lake", from: "modular" }),
  Object.freeze({ name: "On Villages", from: "modular" }),
  Object.freeze({ name: "On Encounters", from: "modular" }),
  Object.freeze({ name: "Not Adj. to structures", from: "modular" }),
  Object.freeze({ name: "Diamond pattern", from: "modular" }),
  Object.freeze({ name: "On Mountains/Forests", from: "modular" }),
  Object.freeze({ name: "Adj. to Same Encounter", from: "modular" }),
]);

export const TriumphVariants = Object.freeze([
  "Standard",
  "Standard",
  "Peace",
  "War",
  "Random",
  "Random",
]);

export const Triumphs = Object.freeze([
  Object.freeze({
    text: "Upg",
    count: "6",
    tracks: Object.freeze(["standard", "peace", "random"]),
  }),
  Object.freeze({
    text: "Upg/Str",
    count: "6/4",
    tracks: Object.freeze(["war"]),
  }),
  Object.freeze({
    text: "Mch",
    count: "4",
    tracks: Object.freeze(["standard", "war", "random"]),
  }),
  Object.freeze({
    text: "Str",
    count: "4",
    tracks: Object.freeze(["standard", "peace", "random"]),
  }),
  Object.freeze({
    text: "Mch/Rec",
    count: "4",
    tracks: Object.freeze(["peace"]),
  }),
  Object.freeze({
    text: "Rec",
    count: "4",
    tracks: Object.freeze(["standard", "war", "random"]),
  }),
  Object.freeze({
    text: "Wrk",
    count: "8",
    tracks: Object.freeze(["standard", "peace", "random"]),
  }),
  Object.freeze({
    text: "Obj",
    count: "1",
    tracks: Object.freeze(["standard", "war", "peace", "random"]),
  }),
  Object.freeze({ text: "Obj", count: "1", tracks: Object.freeze(["peace"]) }),
  Object.freeze({
    text: "Cbt",
    count: "1",
    tracks: Object.freeze(["standard", "war", "random"]),
  }),
  Object.freeze({
    text: "Cbt",
    count: "1",
    tracks: Object.freeze(["standard", "war", "random"]),
  }),
  Object.freeze({
    text: "Cbt",
    count: "1",
    tracks: Object.freeze(["war", "random"]),
  }),
  Object.freeze({
    text: "Cbt",
    count: "1",
    tracks: Object.freeze(["war", "random"]),
  }),
  Object.freeze({ text: "Pop", count: "13", tracks: Object.freeze(["peace"]) }),
  Object.freeze({
    text: "Pop",
    count: "18",
    tracks: Object.freeze(["standard", "random"]),
  }),
  Object.freeze({
    text: "Pow",
    count: "16",
    tracks: Object.freeze(["standard", "war", "random"]),
  }),
  Object.freeze({
    text: "CCrd",
    count: "8",
    tracks: Object.freeze(["war", "random"]),
  }),
  Object.freeze({ text: "Enc", count: "3", tracks: Object.freeze(["peace"]) }),
  Object.freeze({ text: "Fact", count: "1", tracks: Object.freeze(["peace"]) }),
  Object.freeze({
    text: "Res",
    count: "16",
    tracks: Object.freeze(["peace", "random"]),
  }),
]);
// Desolation: 7 Hex, 20 Coins, 9-pt Bonus, 1 Obj, 5 Stars

export const TriumphIcons = Object.freeze({
  Upg: Object.freeze({ name: "Upgrades", offset: 0 }),
  Cbt: Object.freeze({ name: "Combat", offset: 1 }),
  Mch: Object.freeze({ name: "Mechs", offset: 2 }),
  Str: Object.freeze({ name: "Structures", offset: 3 }),
  Pop: Object.freeze({ name: "Popularity", offset: 4 }),
  Rec: Object.freeze({ name: "Recruits", offset: 5 }),
  Pow: Object.freeze({ name: "Power", offset: 6 }),
  Wrk: Object.freeze({ name: "Workers", offset: 7 }),
  CCrd: Object.freeze({ name: "Combat Cards", offset: 8 }),
  Obj: Object.freeze({ name: "Objectives", offset: 9 }),
  Res: Object.freeze({ name: "Resources", offset: 10 }),
  Enc: Object.freeze({ name: "Encounters", offset: 11 }),
  Fact: Object.freeze({ name: "Factory Card", offset: 12 }),
});

export const Difficulties = Object.freeze({
  1: "Autometta",
  2: "Automa -",
  3: "Automa",
  4: "Automa +",
  5: "Automaszyna",
  6: "Automaszyna +",
  7: "Ultimaszyna",
});

export const InfluenceBonuses = Object.freeze([
  Object.freeze({
    offset: 0,
    bonus: "Your workers can each move once before the game starts",
  }),
  Object.freeze({
    offset: 1,
    bonus:
      "Draw +1 objective card (you may only complete the usual number; Saxony may complete all)",
  }),
  Object.freeze({ offset: 2, bonus: "Draw 2 infrastructure mods; keep 1" }),
  Object.freeze({ offset: 3, bonus: "Draw 4 infrastructure mods; keep 2" }),
  Object.freeze({
    offset: 5,
    bonus: "Draw 2 mech mods; keep 1 (use if desired)",
  }),
  Object.freeze({
    offset: 6,
    bonus: "Draw 4 mech mods; keep 2 (use 0, 1, or 2 if desired)",
  }),
  Object.freeze({ offset: 7, bonus: "Choose your player mat (not randomly)" }),
  Object.freeze({
    offset: 8,
    bonus: "Take an extra turn before Automa's first",
  }),
  Object.freeze({
    offset: 9,
    bonus:
      "Take the Alliance token of your choice (cannot be Automa's faction)",
  }),
  Object.freeze({
    offset: 10,
    bonus:
      "Use Tesla in addition to your own hero; Tesla acts like a second hero and 5th mech",
  }),
  Object.freeze({
    offset: 11,
    bonus: "Increase your popularity and power by 1 each",
  }),
  Object.freeze({
    offset: 12,
    bonus:
      "Place 2 resources of your choice with 1 worker at the start of the game",
  }),
  Object.freeze({
    offset: 13,
    bonus:
      "Peek at Automa's starting combat cards (or the first one they draw if 0 at start)",
  }),
  Object.freeze({
    offset: 14,
    bonus:
      "Don't use the die during setup - just choose all the options for this game",
  }),
]);
