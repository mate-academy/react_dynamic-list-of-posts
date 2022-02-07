import { BASE_URL } from './api';

async function getData(url: string) {
  const response = await fetch(`${BASE_URL}${url}`);

  return response.json();
}

export function getUserPosts(userId: number): Promise<Post[]> {
  return getData(`/posts${userId ? `?userId=${userId}` : ''}`);
}

export function getPostDetails(postId: number): Promise<Post> {
  return getData(`/posts/${postId}`);
}

export function getPostComments(postId: number): Promise<PostComment[]> {
  return getData(`/comments?postId=${postId}`);
}

export function deletePostComment(commentId: number) {
  return fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
  });
}

export function addPostComment({
  postId,
  name,
  email,
  body,
}: PostComment) {
  return fetch(`${BASE_URL}/comments/`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  });
}
