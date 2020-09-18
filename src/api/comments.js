const API_URL = 'https://mate-api.herokuapp.com';

export const getPostComments = async(postId) => {
  const response = await fetch(`${API_URL}/comments`);
  const result = await response.json();

  return result.data.filter(comment => comment.postId === postId);
};

export const deleteComment = async(commentId) => {
  const response = await fetch(
    `${API_URL}/comments/${commentId}`, { method: 'DELETE' },
  );
  const result = await response.json();

  return result.data;
};

export const addComment = async(postId, name, email, body) => {
  const response = await fetch(`${API_URL}/comments/`,
    {
      method: 'POST',
      body: JSON.stringify({
        postId,
        name,
        email,
        body,
      }),
    });

  const result = await response.json();

  return result.data;
};
