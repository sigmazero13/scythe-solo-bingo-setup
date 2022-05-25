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
  v: Object.freeze({ name: "Vesna", offset: 7 }),
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

export const AirshipActives = Object.freeze([
  Object.freeze({ name: "Bombard", num: 1 }),
  Object.freeze({ name: "Bounty", num: 2 }),
  Object.freeze({ name: "Siege Engine", num: 3 }),
  Object.freeze({ name: "Distract", num: 4 }),
  Object.freeze({ name: "Espionage", num: 5 }),
  Object.freeze({ name: "Blitzkreig", num: 6 }),
  Object.freeze({ name: "War Correspondant", num: 8 }),
]);

export const AirshipPassives = Object.freeze([
  Object.freeze({ name: "Ferry", num: 9 }),
  Object.freeze({ name: "Boost", num: 10 }),
  Object.freeze({ name: "Drill", num: 11 }),
  Object.freeze({ name: "Hero", num: 12 }),
  Object.freeze({ name: "Safe Haven", num: 13 }),
  Object.freeze({ name: "Reap", num: 14 }),
  Object.freeze({ name: "Craft", num: 15 }),
  Object.freeze({ name: "Negotiate", num: 16 }),
]);

export const Resolutions = Object.freeze([
  Object.freeze({ name: "Land Rush", num: 1 }),
  Object.freeze({ name: "Factory Explosion", num: 2 }),
  Object.freeze({ name: "Spoils of War", num: 3 }),
  Object.freeze({ name: "King of the Hill", num: 4 }),
  Object.freeze({ name: "Deja Vu", num: 5 }),
  Object.freeze({ name: "Mission Possible", num: 6 }),
  Object.freeze({ name: "Doomsday Clock", num: 7 }),
  Object.freeze({ name: "Backup Plan", num: 8 }),
]);

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
    width: 46,
    height: 46,
    short: "Workers move once @ start",
    bonus: "Your workers can each move once before the game starts",
  }),
  Object.freeze({
    offset: 46,
    width: 53,
    height: 34,
    short: "+1 Objective",
    bonus:
      "Draw +1 objective card (you may only complete the usual number; Saxony may complete all)",
  }),
  Object.freeze({
    offset: 99,
    width: 44,
    height: 44,
    short: "Draw 2 inf. mods (keep 1)",
    bonus: "Draw 2 infrastructure mods; keep 1",
  }),
  Object.freeze({
    offset: 143,
    width: 47,
    height: 44,
    short: "Draw 4 inf. mods (keep 2)",
    bonus: "Draw 4 infrastructure mods; keep 2",
  }),
  Object.freeze({
    offset: 190,
    width: 42,
    height: 44,
    short: "Draw 2 mech mods (keep 1)",
    bonus: "Draw 2 mech mods; keep 1 (use if desired)",
  }),
  Object.freeze({
    offset: 232,
    width: 41,
    height: 43,
    short: "Draw 4 mech mods (keep 2)",
    bonus: "Draw 4 mech mods; keep 2 (use 0, 1, or 2 if desired)",
  }),
  Object.freeze({
    offset: 273,
    width: 150,
    height: 63,
    short: "Choose player mat",
    bonus: "Choose your player mat (not randomly)",
  }),
  Object.freeze({
    offset: 423,
    width: 62,
    height: 66,
    short: "Extra turn before Automa",
    bonus: "Take an extra turn before Automa's first",
  }),
  Object.freeze({
    offset: 485,
    width: 67,
    height: 44,
    short: "Alliance token (not Automa)",
    bonus:
      "Take the Alliance token of your choice (cannot be Automa's faction)",
  }),
  Object.freeze({
    offset: 552,
    width: 32,
    height: 44,
    short: "Gain Tesla",
    bonus:
      "Use Tesla in addition to your own hero; Tesla acts like a second hero and 5th mech",
  }),
  Object.freeze({
    offset: 584,
    width: 63,
    height: 22,
    short: "+1 Popularity, +1 Power",
    bonus: "Increase your popularity and power by 1 each",
  }),
  Object.freeze({
    offset: 647,
    width: 102,
    height: 50,
    short: "+2 resources (@ 1 worker)",
    bonus:
      "Place 2 resources of your choice with 1 worker at the start of the game",
  }),
  Object.freeze({
    offset: 749,
    width: 152,
    height: 70,
    short: "Peek at Automa's combat cards",
    bonus:
      "Peek at Automa's starting combat cards (or the first one they draw if 0 at start)",
  }),
  Object.freeze({
    offset: 901,
    width: 56,
    height: 44,
    short: "Choose all options",
    bonus:
      "Don't use the die during setup - just choose all the options for this game",
  }),
]);
