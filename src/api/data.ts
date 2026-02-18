import {
  URL_COMMENTS,
  URL_SELECTED_POST_COMMENTS,
  URL_SELECTED_USER_POSTS,
  URL_USERS,
} from '../constants/constants';
import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsers = (): Promise<User[]> => client.get(URL_USERS);

export const getPosts = (id: number): Promise<Post[]> =>
  client.get(`${URL_SELECTED_USER_POSTS}${id}`);

export const getSelectedPostComments = (id: number): Promise<Comment[]> =>
  client.get(`${URL_SELECTED_POST_COMMENTS}${id}`);

export const postComment = (comment: CommentData): Promise<Comment> =>
  client.post(URL_COMMENTS, comment);

export const deleteComment = (id: number) =>
  client.delete(`${URL_COMMENTS}/${id}`);
