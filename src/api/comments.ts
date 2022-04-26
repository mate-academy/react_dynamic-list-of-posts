import { BASE_URL } from './api';

export const getPostComments = async (postId: number): Promise<PostComment[]> => {
  try {
    const response = await fetch(`${BASE_URL}/comments?postId=${String(postId)}`);

    return await response.json();
  } catch (error) {
    throw new Error('Error');
  }
};

export const postComment = async (comment: NewPostComment) => {
  await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(comment),
  });
};

export const deletePostComment = async (id: number) => {
  await fetch(`${BASE_URL}/comments/${String(id)}`, {
    method: 'DELETE',
  });
};
