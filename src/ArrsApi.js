const URLposts = 'https://jsonplaceholder.typicode.com/posts';
const URLusers = 'https://jsonplaceholder.typicode.com/users';
const URLcomments = 'https://jsonplaceholder.typicode.com/comments';

export const getPosts = async() => {
  const response = await fetch(URLposts);

  return response.json();
};

export const getUsers = async() => {
  const response = await fetch(URLusers);

  return response.json();
};

export const getComments = async() => {
  const response = await fetch(URLcomments);

  return response.json();
};
