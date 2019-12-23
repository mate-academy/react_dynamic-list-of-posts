const postsURL = 'https://jsonplaceholder.typicode.com/posts';
const commentsURL = 'https://jsonplaceholder.typicode.com/comments';
const usersURL = 'https://jsonplaceholder.typicode.com/users';

export const getPosts = async() => {
  const response = await fetch(postsURL);

  return response.json();
};

export const getComments = async() => {
  const response = await fetch(commentsURL);

  return response.json();
};

export const getUsers = async() => {
  const response = await fetch(usersURL);

  return response.json();
};
