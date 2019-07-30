const API_URL = 'https://jsonplaceholder.typicode.com';

export const getUsers = async() => {
  const response = await fetch(`${API_URL}/users`);
  const usersFromServer = await response.json();
  return usersFromServer;
};

export const getPosts = async() => {
  const response = await fetch(`${API_URL}/posts`);
  const postsFromServer = await response.json();
  return postsFromServer;
};

export const getComments = async() => {
  const response = await fetch(`${API_URL}/comments`);
  const commentsFromServer = await response.json();
  return commentsFromServer;
};
