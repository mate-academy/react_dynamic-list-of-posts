export function generatorAvatar() {
  let num = Math.ceil(Math.random() * 4);
  const baseUrl = 'https://semantic-ui.com/images/avatar2/large/';

  switch (num) {
    case 1:
      num = 'kristy.png';
      break;
    case 2:
      num = 'matthew.png';
      break;
    case 3:
      num = 'molly.png';
      break;
    default:
      num = 'elyse.png';
      break;
  }

  return baseUrl + num;
}
