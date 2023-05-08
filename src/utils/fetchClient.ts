import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

const BASE_URL = 'https://mate.academy/students-api';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';
type AvailableDataType = Post | Comment | unknown | null;

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: AvailableDataType = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return wait(300)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => response.json());
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: Comment | unknown) => {
    return request<T>(url, 'POST', data);
  },
  patch: <T>(url: string, data: Post) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};
