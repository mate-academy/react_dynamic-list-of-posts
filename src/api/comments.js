const BASE_URL = 'https://mate-api.herokuapp.com/comments';

export const getPostComments = async(postId) => {
  const response = await fetch(BASE_URL);
  const postComments = await response.json();

  return postComments.data.filter(comment => comment.postId === postId);
};

export const deleteComment = async(commentId) => {
  const result = await fetch(
    `${BASE_URL}/${commentId}`,
    { method: 'DELETE' },
  );

  return result;
};

export const addComment = async(postId, name, email, body) => {
  const result = await fetch(
    BASE_URL,
    {
      method: 'POST',
      body: JSON.stringify({
        postId,
        name,
        email,
        body,
      }),
    },
  );

  return result;
};
