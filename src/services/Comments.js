const COMMENT_API = `https://jsonplaceholder.typicode.com/comments`;

function getComments() {
  return fetch(COMMENT_API)
    .then(comments => comments.json());
}

export default getComments;
