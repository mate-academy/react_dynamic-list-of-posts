import { BASE_URL, request } from './api';

const COMMENTS_URL = `${BASE_URL}/comments`;

export const getPostComments = async (postId: number | undefined) =>
  request(`${COMMENTS_URL}?postId=${postId}`);
