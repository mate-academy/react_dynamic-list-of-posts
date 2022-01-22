import { BASE_URL } from './api';

const request = (url: string, options?: {}) => {
  return fetch(`${BASE_URL}${url}`, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};

// export const getPostComments = (postId: number): Promise<Comment[]> => {
//   return request(`/comments?postId=${postId - 1}`);
// };

export const getPostComments = (): Promise<Comment[]> => {
  return request('/comments');
};

export const remove = async (comentId: number): Promise<Comment> => {
  return request(`/comments/${comentId}`, { method: 'DELETE' });
};

export const createComment = (
  postId: number,
  name: string,
  email: string,
  body: string,
): Promise<Comment> => {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};
