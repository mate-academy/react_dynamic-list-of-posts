import { request } from './api';

export const getComments = async (postId: string) => {
  const post: Comment[] = await request(`/comments?postId=${+postId}`);

  return post;
};

export const AddComment = async (comment: Partial<Comment>):Promise<Comment> => {
  const data = await request(
    '/comments',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(comment),
    },
  );

  return data;
};

export const DeleteComment = async (commentId: string) => {
  const deletedPost = await request(`/comments/${commentId}`, { method: 'DELETE' });

  return deletedPost;
};
