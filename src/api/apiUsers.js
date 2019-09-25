const APIUSERS_URl = 'https://jsonplaceholder.typicode.com/users';

const getUsersFromServer = async() => {
  const users = await fetch(APIUSERS_URl);

  return users.json();
};

export default getUsersFromServer;
