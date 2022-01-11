import { BASE_URL, getData } from './api';
import { Comment } from '../react-app-env';

export const getPostComments = (postId: number) => {
  const commentsUrl = `${BASE_URL}/comments?postId=${postId}`;

  return getData(commentsUrl);
};

export const deleteComment = async (commentId: number) => {
  const commentUrl = `${BASE_URL}/comments/${commentId}`;

  const response = await fetch(commentUrl, { method: 'DELETE' });

  if (!response.ok) {
    return Promise.reject(new Error(`Can't delete comment. Status code - ${response.status}`));
  }

  return response.json();
};

export const postComment = async (comment: Omit<Comment, 'id'>) => {
  const commentsUrl = 'https://mate.academy/students-api/comments';

  const response = await fetch(commentsUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });

  if (!response.ok) {
    return Promise.reject(new Error(`Can't post comment. Status code - ${response.status}`));
  }

  return response.json();
};
