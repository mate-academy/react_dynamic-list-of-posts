const URL = 'https://jsonplaceholder.typicode.com/comments';

export default function getComments() {
  return fetch(URL)
    .then(posts => posts.json());
}
