import { client } from '../utils/fetchClient';

import { IComment } from '../types/Comment.interface';

export const getPostComments = (postId: number) => (
  client.get<IComment[]>(`/comments?postId=${postId}`)
);

export const postNewComment = (comment: IComment) => (
  client.post<IComment>('/comments', comment)
);

export const deleteComment = (commentId: number) => (
  client.delete(`/comments/${commentId}`)
);
