const commentsURL = 'https://jsonplaceholder.typicode.com/comments';

export const getComments = () => fetch(commentsURL)
  .then(response => response.json());
