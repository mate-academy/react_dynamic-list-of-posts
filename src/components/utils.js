const usersUrl = 'https://jsonplaceholder.typicode.com/users';
const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
const commentsUrl = 'https://jsonplaceholder.typicode.com/comments';

function getData(url) {
  return fetch(url).then(response => response.json());
}

export const getUsers = () => getData(usersUrl);
export const getPosts = () => getData(postsUrl);
export const getComments = () => getData(commentsUrl);
