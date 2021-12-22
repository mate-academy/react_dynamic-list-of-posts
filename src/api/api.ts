import { Comment } from '../components/types/Comment';
import { Option } from '../components/types/Option';

export const BASE_URL = 'https://mate.academy/students-api';

export const request = (url:string, options: Option) => {
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
