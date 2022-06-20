export const BASE_URL = 'https://mate.academy/students-api';

const request = (url: string, options?: {}) => fetch(`${BASE_URL}${url}`, options)
  .then(res => res.json());

export const getUserPosts = (userId: number) => {
  if (userId !== 0) {
    return request(`/posts?userId=${userId}`);
  }

  return request('/posts');
};

export const getPostDetails = (postId: number) => request(`/posts/${postId}`);

export const getPostComments = (postId: number) => request(`/comments?postId=${postId}`);

export const deleteComment = (commentId: number) => request(
  `/comments/${commentId}`,
  {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  },
);

export const addComment = (comment: {
  postId: number,
  name: string,
  email: string,
  body: string,
}) => request(
  '/comments',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      postId: comment.postId,
      name: comment.name,
      email: comment.email,
      body: comment.body,
    }),
  },
);
