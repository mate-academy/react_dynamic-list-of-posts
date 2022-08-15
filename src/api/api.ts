export const BASE_URL = 'https://mate.academy/students-api';

export const request = async (
  url: string,
  option: Partial<Option> | {} = {},
) => {
  const response = await fetch(`${BASE_URL}/${url}`, option);

  if (!response.ok) {
    throw new Error('Failed to load posts');
  }

  return response.json();
};
