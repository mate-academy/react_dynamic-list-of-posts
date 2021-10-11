const BASE_URL = 'https://mate.academy/students-api/';

export const getUsers = async () => {
  try {
    const users = await fetch(`${BASE_URL}users?limit=10`);
    const usersJson = await users.json();

    return usersJson;
  } catch (error) {
    throw new Error(`Fetching users: ${error}`);
  }
};
