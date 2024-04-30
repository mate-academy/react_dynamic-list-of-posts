import { client } from '../../utils/fetchClient';

export const deleteComment = (commentID: number) => {
  return client.delete(`/comments/${commentID}`);
};
