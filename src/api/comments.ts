import { getData } from './posts';

export const getPostComments = (postId: number) => {
  return getData(`/comments?postId=${postId}`);
};

export const deletePostComment = (postId: number) => {
  return getData(`/comments/${postId}`, {
    method: 'DELETE',
  });
};

export const postNewComment = (
  postId: number,
  name: string,
  email: string,
  body: string,
) => {
  return getData('/comments', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  });
};
