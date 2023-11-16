import { Post } from '../types/Post';

const BASE_URL = 'https://mate.academy/students-api';

// a promise resolved after a given delay
function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

// To have autocompletion and avoid mistypes
type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T, S>(
  url: string,
  method: RequestMethod = 'GET',
  data: S | null = null, // we can send any data to the server
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    // We add body and Content-Type only for the requests with data
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  // for a demo purpose we emulate a delay to see if Loaders work
  return wait(300)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => response.json());
}

export const client = {
  get: <T>(url: string) => request<T, null>(url),
  post: <T>(
    url: string,
    data: Omit<Post, 'id'>,
  ) => request<T, Omit<Post, 'id'>>(url, 'POST', data),
  patch: <T>(
    url: string,
    data: Partial<Post>,
  ) => request<T, Partial<Post>>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};
