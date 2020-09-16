const BASE_URL = 'https://mate-api.herokuapp.com/';

export const getPostComments = async(postId) => {
  const comments = await fetch(`${BASE_URL}comments/`);
  const response = await comments.json();

  return response.data.filter(comment => comment.postId === postId);
};

export const deletePostComment = async(commentId) => {
  const link = await fetch(`${BASE_URL}comments/${commentId}`,
    { method: 'DELETE' });
  const response = await link.json();

  return response.data;
};

export const addPostComment = async(postId, name, email, body) => {
  fetch(`${BASE_URL}comments`,
    {
      method: 'POST',
      body: JSON.stringify({
        postId, name, email, body,
      }),
    });
};
