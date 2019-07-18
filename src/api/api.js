const baseUrl = 'https://jsonplaceholder.typicode.com';

export const getPosts = async(urlParams) => {
  const url = '/posts';
  const response = await fetch(`${baseUrl}${url}${urlParams}`);
  const posts = await response.json();

  return posts;
};

export const getUsers = async() => {
  const url = '/users';
  const response = await fetch(`${baseUrl}${url}`);
  const users = await response.json();

  return users;
};

export const getComments = async() => {
  const url = '/comments';
  const response = await fetch(`${baseUrl}${url}`);
  const comments = await response.json();

  return comments;
};
