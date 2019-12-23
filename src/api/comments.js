const API_URL = 'https://jsonplaceholder.typicode.com/comments';

export const getComments = () => (
  fetch(API_URL).then(response => response.json())
);
