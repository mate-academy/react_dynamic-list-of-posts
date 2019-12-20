const postsURL = 'https://jsonplaceholder.typicode.com/posts';
const usersURL = 'https://jsonplaceholder.typicode.com/users';
const commentsURL = 'https://jsonplaceholder.typicode.com/comments';

export const getPosts = async() => {
  const postData = await fetch(postsURL);

  return postData.json();
};

export const getUsers = async() => {
  const userData = await fetch(usersURL);

  return userData.json();
};

export const getComments = async() => {
  const commentData = await fetch(commentsURL);

  return commentData.json();
};
