export const getPosts = async() => {
  const url = 'https://jsonplaceholder.typicode.com/posts';

  const response = await fetch(url);
  const posts = await response.json();

  return posts;
};

export const getUsers = async() => {
  const url = 'https://jsonplaceholder.typicode.com/users';

  const response = await fetch(url);
  const users = await response.json();

  return users;
};

export const getComments = async() => {
  const url = `https://jsonplaceholder.typicode.com/comments`;

  const response = await fetch(url);
  const comments = await response.json();

  return comments;
};
