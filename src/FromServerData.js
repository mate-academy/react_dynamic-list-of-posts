const urlUsers = 'https://jsonplaceholder.typicode.com/users';
const urlPosts = 'https://jsonplaceholder.typicode.com/posts';
const urlCommnets = 'https://jsonplaceholder.typicode.com/comments';

export const getDataUsers = async() => {
  const response = await fetch(urlUsers);
  const DataUsers = await response.json();

  return DataUsers;
};

export const getDataPosts = async() => {
  const response = await fetch(urlPosts);
  const DataPosts = await response.json();

  return DataPosts;
};

export const getDataComments = async() => {
  const response = await fetch(urlCommnets);
  const DataComments = await response.json();

  return DataComments;
};
