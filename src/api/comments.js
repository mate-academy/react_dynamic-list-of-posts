import { add, dell, get } from './api';

const getComments = () => get('/comments');

export const getPostComments = postId => getComments()
  .then((result) => {
    const comments = result.filter(comment => comment.postId === postId);

    if (comments === undefined) {
      return [];
    }

    return comments;
  });

export const addComment = data => add('/comments', data);

export const deleteComment = commentId => dell('/comments', commentId);
