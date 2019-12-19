const URL_USERS = 'https://jsonplaceholder.typicode.com/users';

export const getUsersFromServer = async() => {
  const users = await fetch(URL_USERS);

  return users.json();
};
