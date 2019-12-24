export default function(url) {
  return fetch(url).then(response => response.json());
}
