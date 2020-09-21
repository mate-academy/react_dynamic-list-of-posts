
const COMMENTS_URL = 'https://mate-api.herokuapp.com/comments';

async function request(path, options) {
  const response = await fetch(`${path}`, options);
  const result = await response.json();

  return result.data;
}

export function getPostComments() {
  return request(COMMENTS_URL);
}

export function deleteComment(commentId) {
  return request(`${COMMENTS_URL}/${commentId}`, {
    method: 'DELETE',
  });
}

export function addComment(postId, name, email, body) {
  return request(COMMENTS_URL, {
    method: 'POST',
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  });
}
