import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsers = () => client.get<User[]>('/users');
export const getPosts = (userID: number) => client.get<Post[]>(`/posts?userId=${userID}`);
export const getComments = (postID: number) => client.get<Comment[]>(`/comments?postId=${postID}`);
export const addComment = (data: CommentData) => {
  return client.post<Comment>('/comments', data);
};

export const deleteComment = (commentID: number) => {
  return client.delete(`/comments/${commentID}`);
};
