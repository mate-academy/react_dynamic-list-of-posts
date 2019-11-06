const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
const usersUrl = 'https://jsonplaceholder.typicode.com/users';
const commentsUrl = 'https://jsonplaceholder.typicode.com/comments';

function fetchData(url) {
  return fetch(url)
    .then(response => response.json());
}

function fetchPosts() {
  const posts = fetchData(postsUrl);

  return posts;
}

function fetchUsers() {
  const users = fetchData(usersUrl);

  return users;
}

function fetchComments() {
  const comments = fetchData(commentsUrl);

  return comments;
}

export { fetchPosts, fetchUsers, fetchComments };
