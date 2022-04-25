const BASE_URL = 'https://mate.academy/students-api/comments';

export const getComments = async (postId: number): Promise<Comment[]> => {
  const response = await fetch(`${BASE_URL}?postId=${postId}`);

  if (!response.ok) {
    return Promise.reject(new Error('Error'));
  }

  return response.json();
};

export const createComment = async (comment: Comment) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(comment),
  });

  return response.json();
};

export const removeComment = async (commentId: number) => {
  const response = await fetch(`${BASE_URL}/${commentId}`, { method: 'DELETE' });

  return response.json();
};
