import { Post, User, Comment } from './types';

const API_URL = 'https://jsonplaceholder.typicode.com/';

function loadData<T>(url: string): Promise<T> {
  return fetch(url)
    .then(res => res.json());
}

export const loadPosts = loadData<Post[]>(`${API_URL}posts`);
export const loadUsers = loadData<User[]>(`${API_URL}users`);
export const loadComments = loadData<Comment[]>(`${API_URL}comments`);
