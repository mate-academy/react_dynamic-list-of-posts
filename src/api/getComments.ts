import { client } from '../utils/fetchClient';

export const getComments = (id: number) => {
  return client.get<Comment[]>(`/comments?postid=${id}`);
};
