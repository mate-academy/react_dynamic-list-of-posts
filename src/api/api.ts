export const BASE_URL = 'https://mate.academy/students-api';

const wait = (delay: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
};

export const getData = async (url: string) => {
  await wait(300);
  const response = await fetch(url);

  if (!response.ok) {
    return Promise.reject(new Error(`Something went wrong. Status code - ${response.status}`));
  }

  return response.json();
};
