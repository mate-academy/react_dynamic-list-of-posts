export const getUser = async () => {
  const response = await fetch('https://mate.academy/students-api/users/');

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }
  const users = await response.json();

  return users;
}
