export const BASE_URL = 'https://mate.academy/students-api';

export const request = async (url: string) => {
  try {
    const responce = await fetch(url);

    return await responce.json();
  } catch (error) {
    // eslint-disable-next-line no-console
    return console.error(error);
  }
};
