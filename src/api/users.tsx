const API_URL = 'https://mate.academy/students-api/users';

export const loadUsers = async () => {
  const response = await fetch(API_URL);

  return response.json();
};
