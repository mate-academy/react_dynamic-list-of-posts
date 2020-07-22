const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/';

async function getData<T>(url: string): Promise<T> {
  const response = await fetch(url);

  return response.json();
}

export const loadPosts = (): Promise<Post[]> => {
  return getData<Post[]>(`${API_URL}/posts.json`);
};

export const loadUsers = (): Promise<User[]> => {
  return getData<User[]>(`${API_URL}/users.json`);
};

export const loadComments = (): Promise<Comment[]> => {
  return getData<Comment[]>(`${API_URL}/comments.json`);
};
