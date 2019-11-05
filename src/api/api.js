function getUrl(url) {
  return fetch(url)
    .then(response => response.json());
}

const users = getUrl('https://jsonplaceholder.typicode.com/users');
const posts = getUrl('https://jsonplaceholder.typicode.com/posts');
const comments = getUrl('https://jsonplaceholder.typicode.com/comments');

export { users, posts, comments };
