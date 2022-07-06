import { BASE_URL } from './api';

export const getPostComments = (postId: number): Promise<CommentType[]> => {
  return (fetch(`${BASE_URL}/comments/?postId=${postId}`).then(promise => promise.json()));
};
