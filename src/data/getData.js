const getData = async(url) => {
  const response = await fetch(url);
  const getUsers = await response.json();

  return getUsers;
};

export default getData;
