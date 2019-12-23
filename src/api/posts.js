const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const getPosts = () => (
  fetch(API_URL).then(response => response.json())
);
