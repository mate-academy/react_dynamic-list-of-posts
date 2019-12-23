const postsURL = 'https://jsonplaceholder.typicode.com/posts';

export const getPosts = () => fetch(postsURL)
  .then(response => response.json());
