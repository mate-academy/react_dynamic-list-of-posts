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

export const createComment = comment => save('/comments', comment);

export const deleteComment = commentId => remove(`/comments/${commentId}`);

// export const createComment = () => (
//   post('/comments', {
//     postId: 256,
//     name: 'Hello mate',
//     email: '@.gmail.com',
//     body: 'New comment2',
//   })
// );
