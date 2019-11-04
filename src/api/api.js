export const getPosts = async() => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const currentPost = await response.json();

  return currentPost;
};

export const getUsers = async() => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const currentUsers = await response.json();

  return currentUsers;
};

export const getComments = async() => {
  const response = await fetch('https://jsonplaceholder.typicode.com/comments');
  const currentComment = await response.json();

  return currentComment;
};
