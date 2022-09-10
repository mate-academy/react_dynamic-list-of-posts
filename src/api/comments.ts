import { client } from '../utils/fetchClient';

import { IComment } from '../types/Comment.interface';

export const getPostComments = (postId: number) => (
  client.get<IComment[]>(`/comments?postId=${postId}`)
);

// eslint-disable-next-line max-len
export type TCommentToPost = Pick<IComment, 'name' | 'email' | 'body' | 'postId'>;

export const postNewComment = (comment: TCommentToPost) => (
  client.post<IComment>('/comments', comment)
);

export const deleteComment = (commentId: number) => (
  client.delete(`/comments/${commentId}`)
);
