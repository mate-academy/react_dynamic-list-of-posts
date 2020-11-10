import { BASE_URL, COMMENTS_URL, request, remove, post } from './api';

const getAllComments = async() => {
  const response = await request(`${BASE_URL}${COMMENTS_URL}`);

  return response;
};

export const getPostComments = async(postId) => {
  const allComments = await getAllComments();
  const postComment = allComments
    .filter(({ postId: commentsPostId }) => commentsPostId === postId);

  return postComment;
};

export const removeComment = async(commentId) => {
  const commentItem = await remove(`${BASE_URL}${COMMENTS_URL}/${commentId}`);

  return commentItem;
};

export const createComment = async(data) => {
  const newComment = await post(`${BASE_URL}${COMMENTS_URL}`, data);

  return newComment;
};
