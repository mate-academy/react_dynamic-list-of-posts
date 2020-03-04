import { API_URL } from '../utils/constants';
import { PostType, UserType, CommentType } from '../utils/interfaces';


const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export const getPosts = async (): Promise<PostType[]> => {
  return getData<PostType[]>(`${API_URL}/posts`);
};

export const getUsers = async (): Promise<UserType[]> => {
  return getData<UserType[]>(`${API_URL}/users`);
};

export const getComments = async (): Promise<CommentType[]> => {
  return getData<CommentType[]>(`${API_URL}/comments`);
};
