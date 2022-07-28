const BASE_URL = 'https://mate.academy/students-api';

export const request = async (url: string, method?: RequestInit) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, method);

    return await response.json();
  } catch {
    return Response.error();
  }
};

export const getUsers = (users: string): Promise<User[]> => {
  return request(users);
};
