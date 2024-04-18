import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const addComment = ({
  name,
  postId,
  email,
  body,
}: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', { name, postId, email, body });
};

// export const updatePost = ({ id, name, postId, email, body }: Comment) => {
//   return client.patch<Comment>(`/comments/${id}`, {
//     name,
//     postId,
//     email,
//     body,
//   });
// };
