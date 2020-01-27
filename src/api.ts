const API_URL = 'https://jsonplaceholder.typicode.com';

const getItems = async<T>(url: string): Promise<T[]> => {
  const response = await fetch(API_URL + url);

  if (!response.ok) {
    return [];
  }

  return response.json()
    .catch(() => []);
};

export const getPosts = () => getItems<Post>('/posts');
export const getUsers = () => getItems('/users');
export const getComments = () => getItems('/comments');
