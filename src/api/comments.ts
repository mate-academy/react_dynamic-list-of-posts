import { CommentPost } from '../types/Comment';

const COMMENT_URL = 'https://mate.academy/students-api/comments';

export const getPostComments = (postId: number | null): Promise<CommentPost[]> => {
  return fetch(COMMENT_URL)
    .then(response => response.json())
    .catch(() => [])
    .then(comments => comments.filter((comment: CommentPost) => comment.postId === postId));
};

export const postNewComment = (newComment: Partial<CommentPost>): Promise<CommentPost> => {
  return fetch(COMMENT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(newComment),
  })
    .then(response => response.json());
};

export const deleteComment = (commentID: number) => {
  return fetch(`${COMMENT_URL}/${commentID}`, {
    method: 'DELETE',
  });
};
