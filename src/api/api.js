const postsURL = getFetch('https://jsonplaceholder.typicode.com/posts');
const usersURL = getFetch('https://jsonplaceholder.typicode.com/users');
const commentsURL = getFetch('https://jsonplaceholder.typicode.com/comments');

function getFetch(url) {
  return fetch(url)
    .then(response => response.json());
}

export { postsURL, usersURL, commentsURL };
