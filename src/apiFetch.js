const URL_POSTS = 'https://jsonplaceholder.typicode.com/posts';
const URL_USERS = 'https://jsonplaceholder.typicode.com/users';
const URL_COMMENTS = 'https://jsonplaceholder.typicode.com/comments';

export const fetchPostsAndUsersAndComments = () => Promise.all([
  fetch(URL_POSTS),
  fetch(URL_USERS),
  fetch(URL_COMMENTS),
]).then(responses => Promise.all(responses.map(response => response.json())));
