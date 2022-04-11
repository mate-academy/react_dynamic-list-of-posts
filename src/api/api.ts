export const BASE_URL = 'https://mate.academy/students-api';

const request = async (url: string, option = {}) => {
  const response = await fetch(`${BASE_URL}${url}`, option);

  return response.json();
};

export const getUserPosts = (userId?: number): Promise<Post[]> => {
  if (userId) {
    return request(`/posts?userId=${userId}`);
  }

  return request('/posts');
};

export const getUsers = (): Promise<User[]> => request('/users');

export const getPostDetails = (postId: number): Promise<Post> => {
  return request(`/posts/${postId}`);
};

export const getPostComments = (postId: number) => {
  return request(`/comments?postId=${postId}`);
};

export const createComment = (comment: Partial<Comment>) => {
  return request('/comments', {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(comment),
  });
};

export const deleteComment = (commentId: number) => {
  return request(`/comments/${commentId}`, {
    method: 'Delete',
  });
};
