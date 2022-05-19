import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { request } from './api';

export const getPostComments = (postId: Post['id']) => request<Comment[]>(`/comments?postId=${postId}`);
