const baseURL = 'https://jsonplaceholder.typicode.com';

const getResponse = async (url) => {
  const response = await fetch(url);

  return response.json();
};

export const getPosts = async () => {
  return await getResponse(`${baseURL}/posts`);
};

export const getUsers = async () => {
  return await getResponse(`${baseURL}/users`);
};

export const getComments = async () => {
  return await getResponse(`${baseURL}/comments`);
};


