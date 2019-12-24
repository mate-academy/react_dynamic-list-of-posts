const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

export const getPostsFromServer = async() => {
  const response = await fetch(POSTS_URL);

  return response.json();
};

export const getCommentsFromServer = async() => {
  const response = await fetch(COMMENTS_URL);

  return response.json();
};

export const getUsersFromServer = async() => {
  const response = await fetch(USERS_URL);

  return response.json();
};
