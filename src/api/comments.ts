export const getComments = (commentsId: number) => {
  return fetch(`https://mate.academy/students-api/comments?postId=${commentsId}`).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
  });
};

export const removeComment = (commentId: number) => {
  return fetch(`https://mate.academy/students-api/comments/${commentId}`, { method: 'DELETE' });
};
