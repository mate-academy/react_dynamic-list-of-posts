const URL = 'https://jsonplaceholder.typicode.com/';

export async function dataDownload<T>(url: string): Promise<T> {
  return fetch(url)
    .then(response => response.json());
}

export async function getUsers(): Promise<User[]> {
  return fetch(URL + 'users')
    .then(response => response.json());
}

export async function getPosts(): Promise<Post[]> {
  return fetch(URL + 'posts')
    .then(response => response.json());
}

export async function getComments(): Promise<Comment[]> {
  return fetch(URL + 'comments')
    .then(response => response.json());
}
