import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getCommentsByPostId = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`).then(response => {
    if ('error' in response) {
      throw new Error();
    }

    return response;
  });
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`).then(response => {
    if (response !== 1) {
      throw new Error();
    }

    return response;
  });
};

interface CommentForUploadd extends CommentData {
  postId: number
}

export const addComment = (comment: CommentForUploadd) => {
  return client.post<Comment>('/comments', comment)
    .then(response => {
      if ('error' in response) {
        throw new Error();
      }

      return response;
    });
};
