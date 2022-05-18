export const BASE_URL = 'https://mate.academy/students-api';

export const request = async (url: string, options?: Option) => {
  let response: Response;

  if (options) {
    response = await fetch(`${BASE_URL}${url}`, options);
  } else {
    response = await fetch(`${BASE_URL}${url}`);
  }

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
};

export const getUser = (userId: number) => {
  return request(`/users/${userId}`);
};
