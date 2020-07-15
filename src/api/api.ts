const API_URL = 'https://jsonplaceholder.typicode.com/';

async function getData<T>(url: string): Promise<T> {
  const response = await fetch(url);

  return response.json();
}

export const getPosts = (): Promise<Post[]> => {
  return getData<Post[]>(`${API_URL}posts`);
};

export const getUsers = (): Promise<User[]> => {
  return getData<User[]>(`${API_URL}users`);
};

export const getComments = (): Promise<Comment[]> => {
  return getData<Comment[]>(`${API_URL}comments`);
};
