const BASE_URL = 'https://mate-api.herokuapp.com/comments';

export const getComments = async(postId) => {
  const comments = await fetch(`${BASE_URL}`);

  return comments.json()
    .then(result => result.data.filter(comment => comment.postId === postId));
};

export const removeComment = async(commentId) => {
  const comment = await fetch(
    `${BASE_URL}/${commentId}`,
    { method: 'DELETE' },
  );

  return comment.json()
    .then(result => result.data);
};

export const addComment = async(postId, name, email, body) => fetch(BASE_URL, {
  method: 'POST',
  body: JSON.stringify({
    postId, name, email, body,
  }),
});
