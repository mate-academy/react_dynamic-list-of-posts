function loadUsers() {
  return fetching('https://jsonplaceholder.typicode.com/users');
}

function loadPosts() {
  return fetching('https://jsonplaceholder.typicode.com/posts');
}

function loadComments() {
  return fetching('https://jsonplaceholder.typicode.com/comments');
}

function fetching(url) {
  return fetch(url)
    .then(response => response.json());
}

export { loadUsers, loadPosts, loadComments };
