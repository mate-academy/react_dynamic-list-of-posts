export const BASE_URL = 'https://mate.academy/students-api';

const request = async (url: string, options?: Options) => {
  const response = await fetch(`${BASE_URL}${url}`, options);

  return response.json();
};

export const getUserPosts = (userId: number) => {
  return request(`/posts?userId=${userId}`);
};

export const getPosts = () => {
  return request('/posts');
};

export const getPostById = (postId: number) => {
  return request(`/posts/${postId}`);
};

export const getPostComments = (postId: number) => {
  return request(`/comments?postId=${postId}`);
};

export const removePostComment = (commentId: number) => {
  return request(`/comments/${commentId}`, { method: 'DELETE' });
};

export const addPostComment = (newComment: NewComment) => {
  return request('/comments', {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(newComment),
  });
};
