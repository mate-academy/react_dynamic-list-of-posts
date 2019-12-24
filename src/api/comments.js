const commentsUrl = 'https://jsonplaceholder.typicode.com/comments';

export const getComments = () => fetch(commentsUrl)
  .then(response => (response.ok ? response.json() : []))
  .catch(() => []);
