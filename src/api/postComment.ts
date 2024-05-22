import { Comment, CommentData } from '../types/Comment';

import { client } from '../utils/fetchClient';

export const postComment = (
  url: string,
  data: CommentData,
): Promise<Comment> => {
  return client.post<Comment>(url, data);
};
