const BASE_URL = 'https://mate.academy/students-api/';

export const getComments = async (postId: number) => {
  try {
    const comments = await fetch(`${BASE_URL}comments`);
    const commentsJson: Comment[] = await comments.json();

    return commentsJson.filter((comment: Comment) => comment.postId === postId);
  } catch (error) {
    throw new Error(`Fetching comments: ${error}`);
  }
};

export const createComment = async (comment: Partial<Comment>) => {
  return fetch(`${BASE_URL}comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(comment),
  });
};

export const deleteComment = async (commentId: number) => {
  return fetch(`${BASE_URL}comments/${commentId}`, {
    method: 'DELETE',
  });
};
