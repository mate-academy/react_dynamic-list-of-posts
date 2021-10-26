import { request } from './api';

export const getComments = async (postId: number): Promise<PostComment[]> => {
  const comments = await request(`/comments?postId=${postId}`);

  return comments;
};

export const addComments = async (comment: Partial<PostComment>): Promise<PostComment> => {
  const newComment: PostComment = await request('/comments', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(comment),
  });

  return newComment;
};

export const deletePostComment = async (commentId: number) => {
  const deletedPost = await request(`/comments/${commentId}`, { method: 'DELETE' });

  return deletedPost;
};
