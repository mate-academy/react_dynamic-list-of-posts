export const BASE_URL = 'https://mate.academy/students-api';

export const getPosts = async () => {
  const res = await fetch(`${BASE_URL}/posts`);

  return res.json();
};

export const getUserPosts = async (userId: number) => {
  const res = await fetch(`${BASE_URL}/posts?userId=${userId}`);

  return res.json();
};

export const getUser = async () => {
  const res = await fetch(`${BASE_URL}/users`);

  return res.json();
};

export const getPostDetails = async (postId: number) => {
  const res = await fetch(`${BASE_URL}/posts/${postId}`);

  return res.json();
};

export const getPostComments = async (postId: number) => {
  const res = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  return res.json();
};

export const deletePostComments = (commentId: number) => {
  return fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
  });
};

export const addCommentPost = async (newComment: Comment) => {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newComment),
  });
};
