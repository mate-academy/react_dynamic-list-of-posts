import { request } from './api';

export const getPostComments = (postId: string): Promise<PostComment[]> => {
  return request(`/comments?postId=${postId}`);
};

export const deletePostComment = async (commentId: number) => {
  return request(`/comments/${commentId}`, {
    method: 'DELETE',
  });
};

export const addPostComment = async (comment: Partial<PostComment>): Promise<PostComment> => {
  const newComment: PostComment = await request('/comments', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(comment),
  });

  return newComment;
};
