const getComments = () => fetch('https://jsonplaceholder.typicode.com/comments')
  .then(response => (response.ok ? response.json() : []))
  .catch(() => 'Error');

export default getComments;
