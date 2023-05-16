import { Comment } from '../types/Comment';
import { CommentResponse } from '../types/CommentResponse';
import { Post } from '../types/Post';
import { PostResponse } from '../types/PostResponse';
import { User } from '../types/User';
import { UserResponse } from '../types/UserResponse';

export const formatUsers = (users: UserResponse[]): User[] => {
  return users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
  }));
};

export const formatPosts = (posts: PostResponse[]): Post[] => {
  return posts.map(post => ({
    id: post.id,
    userId: post.userId,
    title: post.title,
    body: post.body,
  }));
};

export const formatComments = (comments: CommentResponse[]): Comment[] => {
  return comments.map(comment => ({
    id: comment.id,
    postId: comment.postId,
    name: comment.name,
    email: comment.email,
    body: comment.body,
  }));
};
