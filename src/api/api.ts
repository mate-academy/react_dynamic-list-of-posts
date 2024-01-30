import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export function getUsers() {
  return client.get<User[]>('/users')
    .catch(err => {
      throw err;
    });
}

export function getPosts(userId: number) {
  return client.get<Post[]>(`/posts?userId=${userId}`)
    .catch(err => {
      throw err;
    });
}

export function getComments(postId: number) {
  return client.get<Comment[]>(`/comments?postId=${postId}`)
    .catch(err => {
      throw err;
    });
}

export function createComment(comment: Comment) {
  return client.post<Comment>('/comments', comment)
    .catch(err => {
      throw err;
    });
}

export function deleteComment(commentId: number) {
  return client.delete(`/comments/${commentId}`)
    .catch(err => {
      throw err;
    });
}
