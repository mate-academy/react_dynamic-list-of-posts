import { getData } from './api';

export function getPosts() {
  return getData<Post[]>('/posts');
}

export function getUserPosts(userId: number) {
  if (userId !== 0) {
    return getData<Post[]>(`/posts?userId=${userId}`);
  }

  return getPosts();
}

export function getPostDetails(postId: number) {
  return getData<Post[]>(`${postId}`);
}
