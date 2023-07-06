import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from './fetchClient';

export const getUsersFromServer = () => client.get<User[]>('/users');
export const getPostsFromServer = (userID: number) => client.get<Post[]>(`/posts?userId=${userID}`);

export const getCommentsFromServer = (postId: number) => (
  client.get<Comment[]>(`/comments?postId=${postId}`)
);

export const deleteCommentFromServer = (commentId: number) => (
  client.delete(`/comments/${commentId}`)
);

export const postNewComment = (comment: CommentData) => (
  client.post<Comment>('/comments', comment)
);
