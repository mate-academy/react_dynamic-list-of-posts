const comments = () => fetch('https://jsonplaceholder.typicode.com/comments')
  .then(response => response.json());

export default comments;
