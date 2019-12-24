const postsUrl = 'https://jsonplaceholder.typicode.com/posts';

export const getPosts = () => fetch(postsUrl)
  .then(response => (response.ok ? response.json() : []))
  .catch(() => []);
