
export const getPostsFromServer = () => (
  fetch('https://jsonplaceholder.typicode.com/posts').then((response => response.json()))
);
export const getUsersFromServer = () => (
  fetch('https://jsonplaceholder.typicode.com/users').then((response => response.json()))
);
export const getCommentsFromServer = () => (
  fetch('https://jsonplaceholder.typicode.com/comments').then((response => response.json()))
);
