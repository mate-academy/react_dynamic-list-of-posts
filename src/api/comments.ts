import { request } from './post';

export const deleteComment = async (commentId: number) => {
  const deletedPost = await request(`/comments/${commentId}`, {
    method: 'DELETE',
  });

  return deletedPost;
};

export const addComment = async (comment: Partial<PostComment>): Promise<PostComment> => {
  const newComment: PostComment = await request('/comments', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(comment),
  });

  return newComment;
};
