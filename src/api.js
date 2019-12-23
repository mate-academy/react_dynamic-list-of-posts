export const getPosts
 = () => fetch('https://jsonplaceholder.typicode.com/posts')
   .then(response => (response.ok ? response.json() : []))
   .catch(() => []);
export const getUsers
= () => fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => (response.ok ? response.json() : []))
  .catch(() => []);
export const getComments
= () => fetch('https://jsonplaceholder.typicode.com/comments')
  .then(response => (response.ok ? response.json() : []))
  .catch(() => []);
