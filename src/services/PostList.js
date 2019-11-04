const POST_API = `https://jsonplaceholder.typicode.com/posts`;

function getPosts() {
  return fetch(POST_API)
    .then(posts => posts.json());
}

export default getPosts;
