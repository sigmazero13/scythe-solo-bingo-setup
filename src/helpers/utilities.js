export function isBlank(value) {
  return !value || /^\s*$/.test(value);
}
