function getPostInfo(url) {
  return fetch(url)
    .then(response => response.json());
}

const posts = getPostInfo(`https://jsonplaceholder.typicode.com/posts`);
const users = getPostInfo(`https://jsonplaceholder.typicode.com/users`);
const comments = getPostInfo(`https://jsonplaceholder.typicode.com/comments`);

export { posts, users, comments };
