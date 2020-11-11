import { remove, request, post } from './api';

export function getAllPosts() {
  return request('/posts');
}

export async function getUserPosts(userId) {
  const posts = await request('/posts');

  return posts.filter(currentPost => currentPost.userId === userId);
}

export function getPostDetails(postId) {
  return request(`/posts/${postId}`);
}

export async function getPostComments(postId) {
  const comments = await request('/comments');

  return comments
    .filter(comment => comment.postId === postId);
}

export function deletePostComment(commentId) {
  return remove(commentId);
}

export function postComment(body) {
  return post(body);
}
