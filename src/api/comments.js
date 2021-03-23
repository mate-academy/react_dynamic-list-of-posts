const BASE_URL = 'https://mate-api.herokuapp.com';

export const getPostComments = async(postId) => {
  const response = await fetch(`${BASE_URL}/comments/?postId=${postId}`);
  const comments = await response.json();

  return comments.data;
};

export const deleteComment = async(commentId) => {
  const response = await fetch(
    `${BASE_URL}/comments/${commentId}`, { method: 'DELETE' },
  );

  return response;
};

export const createComment = async(newComment) => {
  const response = await fetch(
    `${BASE_URL}/comments`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(newComment),
    },
  );
  const comments = await response.json();

  return comments;
};
