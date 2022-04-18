import { Comment } from '../types/Comment';

export const BASE_URL = 'https://mate.academy/students-api';

// region request
export const request = (url: string, option?: RequestInit) => (
  fetch(`${BASE_URL}${url}`, option)
    .then(response => {
      if (!response.ok) {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw `${response.status} - ${response.statusText}`;
      }

      return response.json();
    })
);
// endregion

// region post
export const post = (url: string, data: Omit<Comment,
'id' | 'createdAt' | 'updatedAt'>) => (
  request(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  })
);
// endregion

// region patch
export const patch = (url: string, data: RequestInit) => (
  request(url, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  })
);
// endregion

// region remove
export const remove = (url: string) => (
  request(url, { method: 'DELETE' })
);
// endregion

export const wait = (delay: number) => {
  return new Promise(resolve => setTimeout(resolve, delay));
};
