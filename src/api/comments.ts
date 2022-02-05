import { BASE_URL, getData } from './api';

export const getPostComments = (postId: number) => {
  return getData<Comment[]>(`comments?postId=${postId}`);
};

export const deleteComment = async (commentId: number) => {
  await fetch(`${BASE_URL}comments/${commentId}`, {
    method: 'DELETE',
  });
};

export const addComment = async (comment: NewComment) => {
  try {
    const response = await fetch(`${BASE_URL}comments`, {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();
    // eslint-disable-next-line
    console.log('успішно додано:', json);
  } catch (error) {
    // eslint-disable-next-line
    console.error('Коментар не додано:', error);
  }
};
