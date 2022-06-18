import { BASE_URL } from './api';

export function getUserPosts(userId: number): Promise<Post[]> {
  return fetch(`${BASE_URL}/posts${userId === 0 ? '' : `?userId=${userId}`}`)
    .then(response => response.json());
}

// export function getPostDetails(postId: number) {
//   return fetch(`${BASE_URL}/posts/${postId}`)
//     .then(response => response.json());
// }

export function getPostComments(postId: number): Promise<Comment[]> {
  return fetch(`${BASE_URL}/comments?postId=${postId}`)
    .then(response => response.json());
}
