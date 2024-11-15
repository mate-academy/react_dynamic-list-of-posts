import { ApiPath } from '../enums/ApiPath';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getUserPosts = (userId: number) => {
  return client.get<Post[]>(`${ApiPath.POSTS_PATH}?userId=${userId}`);
};

export const getCommentsByPostId = (postid: number) => {
  return client.get<Comment[]>(`${ApiPath.COMMENTS_PATH}?postId=${postid}`);
};
