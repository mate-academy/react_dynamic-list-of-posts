export const getPostComments = postId => fetch(
  `https://mate-api.herokuapp.com/comments?postId=${postId}`,
)
  .then(response => response.json());

export const addComment = comment => fetch(
  `https://mate-api.herokuapp.com/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(comment),
  },
)
  .then(response => response.json())
  .then(com => com.data);

export const deleteComment = id => fetch(
  `https://mate-api.herokuapp.com/comments/${id}`, {
    method: 'DELETE',
  },
)
  .then(response => response.json())
  .then(com => com.data);
