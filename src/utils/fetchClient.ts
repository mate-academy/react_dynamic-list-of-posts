import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

const BASE_URL = 'https://mate.academy/students-api';

// a promise resolved after a given delay
function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

// To have autocompletion and avoid mistypes
type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any = null, // we can send any data to the server
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
  get: <T>(url: string) => request<T>(url),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};

export function getAllUsers() {
  return client.get<User[]>('/users');
}

export function getAllPosts(userId: number) {
  return client.get<Post[]>(`/posts?userId=${userId}`);
}

export function getAllComments(postId: number) {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
}

export function deleteComment(commentId: number) {
  return client.delete(`/comments/${commentId}`);
}

export function addNewComment(commentData: Omit<Comment, 'id'>) {
  return client.post<Comment>('/comments', commentData);
}
