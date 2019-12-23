const getPosts = () => fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => (response.ok ? response.json() : []))
  .catch(() => 'Error');

export default getPosts;
