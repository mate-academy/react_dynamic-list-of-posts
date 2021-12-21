export const BASE_URL = 'https://mate.academy/students-api';

type Comment = {
  id: number,
  postId: number,
  name:string,
  email: string
  body: string,

  createdAt?: string,
  updatedAt?: string,
};
export const request = (url:string, options: { method: string, headers?: { 'Content-type': string }, body?:string }) => {
  return fetch(`${BASE_URL}${url}`, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error');
      }

      return response.json();
    })
    .then(result => result.data);
};

export const add = (url:string, data:Comment) => {
  return request(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });
};

export const remove = (url:string) => {
  return request(url, { method: 'DELETE' });
};
