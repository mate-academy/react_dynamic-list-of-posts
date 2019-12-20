const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

export const getUsersFromServer = async() => {
  const response = await fetch(USERS_URL);

  return response.json();
};
