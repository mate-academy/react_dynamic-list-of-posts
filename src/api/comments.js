
const COMMENTS_URL = 'https://mate-api.herokuapp.com/';

async function request(path, options) {
  const response = await fetch(`${COMMENTS_URL}${path}`, options);
  const result = await response.json();

  return result.data;
}

export function getPostComments() {
  return request(`comments`);
}

export function deleteComment(commentId) {
  return request(`comments/${commentId}`, {
    method: 'DELETE',
  });
}

export function addComment(postId, name, email, body) {
  return request('comments', {
    method: 'POST',
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  });
}
