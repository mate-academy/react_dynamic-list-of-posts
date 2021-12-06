export const BASE_URL = 'https://mate.academy/students-api/';

export const requestStudents = async () => {
  const response = await fetch(`${BASE_URL}/users`);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
};
