const apiUrl = 'https://jsonplaceholder.typicode.com/';
const getData = async(url) => {
  const response = await fetch(apiUrl + url);
  const getUsers = await response.json();

  return getUsers;
};

export default getData;
