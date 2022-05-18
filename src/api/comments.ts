import { getData, removeData, BASE_URL } from './api';

export const getAllComments = async (): Promise<Comment[]> => {
  return getData('/comments');
};

export const getPostComments = async (postId: number): Promise<Comment[]> => {
  return getData(`/comments?postId=${postId}`);
};

export const getCommentById = async (commentId: number): Promise<Comment> => {
  return getData(`/comments/${commentId}`);
};

export const removeComment = async (commentId: number) => {
  return removeData(`/comments/${commentId}`);
};

export const addComment = async (
  postId: number,
  name: string,
  email: string,
  body: string,
) => {
  try {
    const response = await fetch(`${BASE_URL}/comments`, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      method: 'POST',
      body: JSON.stringify({
        postId,
        name,
        email,
        body,
      }),
    });

    return await response.json();
  } catch (error) {
    throw new Error();
  }
};
