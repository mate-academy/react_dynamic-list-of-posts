const BASE_URL = 'https://mate.academy/students-api';

// eslint-disable-next-line max-len
export const request = async (url: string, options: {} | undefined = undefined) => {
  const response = await fetch(`${BASE_URL}/${url}`, options);

  if (!response.ok) {
    throw new Error('Failed to load posts');
  }

  return response.json();
};
