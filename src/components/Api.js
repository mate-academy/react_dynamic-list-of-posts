const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
const usersUrl = 'https://jsonplaceholder.typicode.com/users';
const commentsUrl = 'https://jsonplaceholder.typicode.com/comments';

const getDataFromServer = url => fetch(url)
  .then(response => response.json());

const data = async() => Promise.all([
  getDataFromServer(postsUrl),
  getDataFromServer(usersUrl),
  getDataFromServer(commentsUrl),
]);

export default data;
