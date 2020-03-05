import { PostType, CommentType, UserType } from './interfaces';

const API_URL = 'https://jsonplaceholder.typicode.com/';

async function getData<T>(url: string): Promise<T> {
  const response = await fetch(url);

  return response.json();
}

export const getPosts = () => {
  return getData<PostType[]>(`${API_URL}posts`);
};

export const getUsers = () => {
  return getData<UserType[]>(`${API_URL}users`);
};

export const getComments = () => {
  return getData<CommentType[]>(`${API_URL}comments`);
};
