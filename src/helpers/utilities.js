export function isBlank(value) {
  return !value || /^\s*$/.test(value);
}

export function scoreDiff(game) {
  if (game === null || game === undefined) return 0;
  return game.p_score - game.a_score;
}
