import { CommentsArray } from '../types/CommentsArray';
import { Comment } from '../types/Comment';

export const BASE_URL = 'https://mate.academy/students-api/';

export const getPostComments = async (id: number): Promise<CommentsArray> => {
  const result: CommentsArray = {
    data: null,
    responseError: {
      error: null,
      message: null,
    },
  };

  const res = await fetch(`${BASE_URL}comments?postId=${id}`);

  if (!res.ok) {
    result.responseError.error = 'Error';
    result.responseError.message = `${res.status} ${res.statusText}`;
  } else {
    result.data = await res.json();
  }

  return result;
};

export const postPostComment = async (id: number, newComment: Comment) => {
  const method = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newComment),
  };
  const sendComment = await fetch(`${BASE_URL}comments?postId=${id}`, method);

  return sendComment;
};

export const deleteComment = async (id: number) => {
  // eslint-disable-next-line no-console
  console.log(id); // delete Comment always deletes first comment of first post
  const delComment = await fetch(`${BASE_URL}comments/${id}`, { method: 'DELETE' });

  return delComment;
};
