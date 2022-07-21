import { BASE_URL } from './api';

function request(url: string, options?: {}) {
  return fetch(`${BASE_URL}${url}`, options)
    .then(response => response.json());
}

export function getUserPosts(userId: number) {
  if (userId) {
    return request(`/posts?userId=${userId}`);
  }

  return request('/posts');
}

export function getPostDetails(postId: number) {
  return request(`/posts/${postId}`);
}

export function getPostComments(postId: number) {
  return request(`/comments?postId=${postId}`);
}

export function getUsers() {
  return request('/users');
}

export function addComment(comment: NewComment) {
  return request(
    '/comments',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        postId: comment.postId,
        name: comment.name,
        email: comment.email,
        body: comment.body,
      }),
    },
  );
}

export function deleteComment(commentId: number) {
  return request(
    `/comments/${commentId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    },
  );
}
