export const deleteComment = async (commentId: number) => {
  const COMMENT_URL = `https://mate.academy/students-api/comments/${commentId}`;

  fetch(COMMENT_URL, { method: 'DELETE' });
};

export const addComment = async (comment: ServerComment) => {
  const COMMENTS_URL = 'https://mate.academy/students-api/comments';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(comment),
  };

  await fetch(COMMENTS_URL, options);
};
