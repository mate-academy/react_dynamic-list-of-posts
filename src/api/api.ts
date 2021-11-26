import { Comment } from '../types/Comment';

interface Params {
  method: string,
  headers?: {
    'Content-Type': string,
  },
  body?: string,
}

export const BASE_URL = 'https://mate.academy/students-api';

const request = async (endPoint = '', params: Params = { method: 'GET' }) => {
  try {
    const response = await fetch(`${BASE_URL}${endPoint}`, params);
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Error with request');
    }

    return data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);

    return null;
  }
};

export const API = {
  getPosts: () => request('/posts'),
  getUserPosts: (userId: number) => request(`/posts?userId=${userId}`),
  getPostDetails: (postId: number) => request(`/posts/${postId}`),
  getPostComments: (postId: number) => {
    return request('/comments')
      .then(data => data.filter((el: Comment) => el.postId === postId));
  },
  deleteComments: (id: number) => request(`/comments/${id}`, { method: 'DELETE' }),
  addComment: (comment: Partial<Comment>) => request('/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(comment),
  }),
};
