const baseURL = 'https://jsonplaceholder.typicode.com';

const getResponse = async (url) => {
  const response = await fetch(url);

  return response.json();
};

export const getPosts = () => {
  return getResponse(`${baseURL}/posts`);
};

export const getUsers = () => {
  return getResponse(`${baseURL}/users`);
};

export const getComments = () => {
  return getResponse(`${baseURL}/comments`);
};


