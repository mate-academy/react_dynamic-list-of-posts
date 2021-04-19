const BASE_URL = 'https://mate-api.herokuapp.com';

export const getPostComments = async(postId) => {
  const response = await fetch(`${BASE_URL}/comments/?postId=${postId}`);
  const comments = await response.json();

  return comments.data;
};

export const deleteComment = async(id) => {
  await fetch(`${BASE_URL}/comments/${id}`, {
    method: 'DELETE',
  });
};

export const addCommentToServer = (comment) => {
  fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      postId: comment.postId,
      name: comment.name,
      email: comment.email,
      body: comment.body,
    }),
  })
    .then(response => response.json());
};
