export const BASE_URL = 'https://mate.academy/students-api';

export const getPosts = async () => {
  const response = await fetch(`${BASE_URL}/posts`);

  return response.json();
};

export const getUserPosts = async (userId: number) => {
  const response = await fetch(`${BASE_URL}/posts/?userId=${userId}`);

  return response.json();
};

export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);

  return response.json();
};

export const getPostDetails = async (postId: number) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);

  return response.json();
};

export const getPostComments = async (postId: number) => {
  const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  return response.json();
};

export const removeComment = (commentId: number) => {
  return fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
  });
};

export const addComment = (newComment: Partial<Comment>) => {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newComment),
  });
};
