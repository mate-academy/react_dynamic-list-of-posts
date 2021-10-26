import { request } from './api';

export const getUserPosts = (userId: number) => {
  if (userId === 0) {
    return (
      request('/posts')
        .then(posts => posts)
    );
  }

  return (
    request(`/posts?userId=${userId}`)
      .then(posts => posts)
  );
};

export const getPostDetails = (postId: number): Promise<Post> => {
  return (
    request(`/posts/${postId}`)
      .then(post => post)
  );
};
