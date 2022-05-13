export const BASE_URL = 'https://mate.academy/students-api';

export const request = async (url: string) => {
  const response = await fetch(`${BASE_URL}${url}`);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
};

export const requestWithOptions = async (url: string, options: Option) => {
  const response = await fetch(`${BASE_URL}${url}`, options);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
};

export const getUsers = async () => {
  const userPosts = await request('/users');

  return userPosts;
};

export const getUser = (userId: number) => {
  return request(`/users/${userId}`);
};
