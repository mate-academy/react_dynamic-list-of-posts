import { BASE_URL } from './api';

export const getPostComments = (selectedPostId: number) => {
  return fetch(`${BASE_URL}/comments?postId=${selectedPostId}`)
    .then(response => response.json());
};

export const deleteCommentHandler = (id:number) => {
  return fetch(`${BASE_URL}/comments/${id}`, {
    method: 'DELETE',
  });
};

const request = (url:string, options: {}) => {
  return fetch(`${BASE_URL}${url}`, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Something went wrong, please try later');
      }

      return response.json();
    }).then(result => result.data);
};

const post = (url: string, data:{}) => {
  return request(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });
};

export const createComments = (postId: number, name: string,
  email: string, body: string) => {
  return post('/comments', {
    postId,
    name,
    email,
    body,
  });
};
