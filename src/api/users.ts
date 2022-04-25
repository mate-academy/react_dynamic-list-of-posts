const BASE_URL = 'https://mate.academy/students-api/users';

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    return Promise.reject(new Error('Error'));
  }

  return response.json();
};
