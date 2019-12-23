const postsURL = 'https://jsonplaceholder.typicode.com/posts';
const usersURL = 'https://jsonplaceholder.typicode.com/users';
const commentsURL = 'https://jsonplaceholder.typicode.com/comments';

const getData = URL => fetch(URL)
  .then(response => response.json());

export const getPosts = () => getData(postsURL);
export const getUsers = () => getData(usersURL);
export const getComments = () => getData(commentsURL);
