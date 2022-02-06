import { BASE_URL } from './api';

const COMMENTS_URL = `${BASE_URL}/comments`;

export const getPostComments = async (postId: number): Promise<PostComment[]> => {
  const postComments = await fetch(`${COMMENTS_URL}?postId=${postId}`);

  return postComments.json();
};

export const deletePostComment = async (commentId: number): Promise<PostComment> => {
  const deletedComment = await fetch(`${COMMENTS_URL}/${commentId}`, { method: 'DELETE' });

  return deletedComment.json();
};

export const postingComment = async (comment: Omit<PostComment, 'id'>): Promise<PostComment> => {
  const postedComment = await fetch(COMMENTS_URL, {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  return postedComment.json();
};
