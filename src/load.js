
async function load (url) {
  const response = await fetch(url);
  const items = await response.json();
  return items;
}

export default load;
