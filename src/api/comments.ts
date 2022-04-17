import { create, remove, request } from './api';
import { NewCommentWithoutId } from '../types';

const COMMENTS_URL = '/comments';

export const getPostComments = (postId: number) => request(`${COMMENTS_URL}?postId=${postId}`);
export const addComment = (data: NewCommentWithoutId) => create(`${COMMENTS_URL}/`, data);
export const removeComment = (commentId: number) => remove(`${COMMENTS_URL}/${commentId}`);
