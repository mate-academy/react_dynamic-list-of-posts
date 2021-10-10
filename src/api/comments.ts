export const getPostComments = (postId: number) => {
  return fetch(`https://mate.academy/students-api/comments?postId=${postId}`)
    .then(response => response.json());
};

export const deletePostComments = (commentId: number) => {
  return fetch(`https://mate.academy/students-api/comments/${commentId}`, { method: 'DELETE' });
};

export const addPostComments = (postId: number, name: string, email: string, body: string) => {
  return fetch('https://mate.academy/students-api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  });
};
