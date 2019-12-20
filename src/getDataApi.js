const getGoods = url => (
  fetch(url).then(response => response.json())
);

export default getGoods;
