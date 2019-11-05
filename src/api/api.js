const defaultUrl = ' https://jsonplaceholder.typicode.com';

const getData = async(url) => {
  const response = await fetch(url);

  return response.json();
};

export const getPosts = () => getData(`${defaultUrl}/posts`);
export const getUsers = () => getData(`${defaultUrl}/users`);
export const getComments = () => getData(`${defaultUrl}/comments`);
