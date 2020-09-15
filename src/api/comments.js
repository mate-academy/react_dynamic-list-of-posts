const COMMENTS_URL = 'https://mate-api.herokuapp.com/comments';

export const getPostComments = async(postId) => {
  const response = await fetch(`${COMMENTS_URL}`);
  const result = await response.json();
  const comments = await result.data;

  return comments.filter(comment => comment.postId === postId);
};

export const deleteComment = (commentId) => {
  const url = `${COMMENTS_URL}/${commentId}`;
  const options = {
    method: 'DELETE',
  };

  return fetch(url, options);
};

export const addComment = (newComment) => {
  const url = `${COMMENTS_URL}`;
  const options = {
    method: 'POST',
    body: JSON.stringify(newComment),
  };

  return fetch(url, options);
};
