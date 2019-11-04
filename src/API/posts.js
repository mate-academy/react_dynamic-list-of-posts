const URL = 'https://jsonplaceholder.typicode.com/posts';

export default function getPosts() {
  return fetch(URL)
    .then(posts => posts.json());
}
