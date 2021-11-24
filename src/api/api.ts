export const BASE_URL = 'https://mate.academy/students-api';

export const request = async (url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`The problem is here ${error}`);
  }
};
