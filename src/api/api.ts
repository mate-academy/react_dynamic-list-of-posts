export const BASE_URL = 'https://mate.academy/students-api';

const request = (url: string, option: RequestInit | undefined) => {
  return fetch(`${BASE_URL}${url}`, option)
    .then(response => response.json());
};

export function getUserPosts(userId: string): Promise<Post[]> {
  return request(`/posts?userId=${userId}`, undefined);
}

export function getAllUsersPosts(): Promise<Post[]> {
  return request('/posts', undefined);
}

export function getUserComments(): Promise<PostComment[]> {
  return request('/comments', undefined);
}

export const setRemoveComment = (commentId: number | undefined) => {
  return fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' });
};

export const setCreateComment = (newComment: PostComment) => {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      ...newComment,
    }),
  })
    .then(response => response.json());
};
