export function retry(
  callback: (value: number | null) => void,
  value: number | null = null,
) {
  return callback(value);
}
