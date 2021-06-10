import { getData, remove, create } from './api';

export const getPosts = () => getData('/posts');

export const getUserPosts = userId => (getPosts()
  .then(posts => posts.filter(post => post.userId === userId))
);

export const getPostDetails = postId => getData(`/posts/${postId}`);

export const getPostComments = postId => (
  getData(`/comments`)
    .then(comments => comments.filter(comment => comment.postId === postId))
);

export const removeCommentById = id => remove(`/comments/${id}`);

// eslint-disable-next-line
export const createComment = ({ postId, name, email, body }) => {
  return create(`/comments`, {
    postId, name, email, body,
  });
};
