const defaultUrl = ' https://jsonplaceholder.typicode.com';

const getData = async (url) => {
  const response = await fetch(url);

  return response.json();
}

export const getPosts = () => {
  return getData(`${defaultUrl}/posts`)
}

export const getUsers = () => {
  return getData(`${defaultUrl}/users`)
}

export const getComments = () => {
  return getData(`${defaultUrl}/comments`)
}
