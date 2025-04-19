export function getHashValue() {
  return window.location.hash ? window.location.hash.substring(1) : null;
}
