/* eslint-disable no-console */
export const BASE_URL = 'https://mate.academy/students-api';

export async function getPosts():Promise<Post[]> {
  return fetch(`${BASE_URL}/posts`)
    .then(posts => posts.json());
}

export async function getUsers():Promise<User[]> {
  return fetch(`${BASE_URL}/users`)
    .then(posts => posts.json());
}

export async function getPostDetails(id:number):Promise<Post> {
  return fetch(`${BASE_URL}/posts/${id}`)
    .then(postsDetails => postsDetails.json());
}

export async function getPostComments(id:number):Promise<Comment[]> {
  return fetch(`${BASE_URL}/comments/?postId=${id}`)
    .then(commentsByid => commentsByid.json());
}

export function deleteComment(id:number) {
  return fetch(`${BASE_URL}/comments/${id}`, { method: 'DELETE' });
}

export function addComment(newComment: AddComment) {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(
      newComment,
    ),
  });
}
