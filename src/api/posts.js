import { request, save, remove } from './api';

export const getPosts = () => request('/posts');

export const getUserPosts = async(userId) => {
  const posts = await getPosts();

  return posts.filter(post => post.userId === userId);
};

export const getPostDetails = postId => request(`/posts/${postId}`);

export const getComments = async(postId) => {
  const comments = await request('/comments');

  return comments.filter(comment => comment.postId === postId);
};

export const saveComment = comment => save('/comments', comment);

export const deleteComment = commentId => remove(`/comments/${commentId}`);
