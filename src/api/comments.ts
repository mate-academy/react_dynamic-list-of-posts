import { BASE_URL } from './api';

export const getPostComments = async (postId: number) => {
  const comments = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  if (comments.ok) {
    return comments.json();
  }

  return [];
};

export const addNewComment = async (comment: Partial<Comment>) => {
  const newCommentToServer = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });

  return newCommentToServer.json();
};

const newComment: Partial<Comment> = {
  id: 327493848934,
  postId: 4,
  email: 'email',
  body: 'body',
  name: 'name',
};

//  eslint-disable-next-line no-console
console.log(addNewComment(newComment));
