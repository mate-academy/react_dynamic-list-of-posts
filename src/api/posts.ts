import { request } from './api';

export const getUserPosts = (userId: number) => {
  if (userId === 0) {
    return request('posts');
  }

  return request(`posts?userId=${userId}`);
};

export const getPostDetails = (postId: number) => {
  return request(`/posts/${postId}`);
};

export const addCommentToTheServer = (newComment: Partial<Comment>) => {
  return request('comments', {
    method: 'POST',
    body: JSON.stringify(newComment),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};
