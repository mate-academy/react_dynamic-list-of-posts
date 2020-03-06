import { POSTS_URL, USERS_URL, COMMENTS_URL } from '../constants/urls';

export async function getData <T>(url: string): Promise<T> {
  const response = await fetch(url);

  return response.json();
}

export const getUsers = async (): Promise<User[]> => {
  return getData<User[]>(USERS_URL);
};

export const getPosts = async (): Promise<Post[]> => {
  return getData<Post[]>(POSTS_URL);
};

export const getComments = async (): Promise<Comment[]> => {
  return getData<Comment[]>(COMMENTS_URL);
};
