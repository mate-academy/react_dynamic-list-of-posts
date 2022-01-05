import { request } from './api';
import { Comment } from '../Types/Comment';

export const getPostComments = (postId: Comment['postId']) => request<Comment[]>(`/comments?postId=${postId}`);
