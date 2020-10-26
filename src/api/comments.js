const COMMENTS_URL = 'https://mate-api.herokuapp.com/comments';

export const getPostComments = async(postId) => {
  const comments = fetch(`${COMMENTS_URL}`)
    .then(promise => promise.json())
    .then(result => result.data.filter(comment => comment.postId === postId));

  return comments;
};

export const removePostComment = (commentId) => {
  const comments = fetch(`${COMMENTS_URL}/${commentId}`, { method: 'DELETE' })
    .then(promise => promise.json())
    .then(result => result.data);

  return comments;
};

export const addPostComment = (newComment) => {
  const comments = fetch(`${COMMENTS_URL}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newComment),
  })
    .then(promise => promise.json())
    .then(result => result.data);

  return comments;
};
