const BASE_URL = 'https://mate-api.herokuapp.com/comments';

export async function getPostComments(id) {
  const response = await fetch(`${BASE_URL}`);
  const result = await response.json();
  const comments = await result.data;

  return comments.filter(comment => comment.postId === +id);
}
