const BASE_URL = 'https://mate.academy/students-api';

export const request = async (url: string, method?: RequestInit) => {
  const response = await fetch(`${BASE_URL}${url}`, method);

  if (!response.ok) {
    throw new Error(`${response.status}-${response.statusText}`);
  }

  return response.json();
};

export const getUsers = (users: string): Promise<User[]> => {
  return request(users);
};
