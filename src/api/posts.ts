import { BASE_URL } from './api';

export const getUserPosts = async (userId: number): Promise<Post[]> => {
  let url = `${BASE_URL}/posts`;

  if (userId > 0) {
    url += `?userId=${userId}`;
  }

  const response = await fetch(url);

  return response.json();
};

export const getPostDetails = async (postId: number): Promise<Post> => {
  const url = `${BASE_URL}/posts/${postId}`;

  const response = await fetch(url);

  return response.json();
};

export const getPostComments = async (postId: number): Promise<PostComment[]> => {
  const url = `${BASE_URL}/comments?postId=${postId}`;

  const response = await fetch(url);

  return response.json();
};

export const removeComment = async (commentId: number) => {
  const url = `${BASE_URL}/comments/${commentId}`;

  const response = await fetch(url, {
    method: 'DELETE',
  });

  return response.json();
};

export const addComment = async (newComment: NewComment) => {
  const response = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(newComment),
  });

  return response.json();
};
