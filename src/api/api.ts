const API_URL = 'https://jsonplaceholder.typicode.com';

export async function getPosts(): Promise<Post[]> {
  return fetch(`${API_URL}/posts`).then(res => res.json());
}

export async function getUsers(): Promise<User[]> {
  return fetch(`${API_URL}/users`).then(res => res.json());
}

export async function getComments(): Promise<Comment[]> {
  return fetch(`${API_URL}/comments`).then(res => res.json());
}
