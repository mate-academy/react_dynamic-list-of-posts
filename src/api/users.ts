export const getUsers = async () => {
  const response = await fetch('https://mate.academy/students-api/users');

  return response.json();
};
