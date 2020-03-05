import { BASE_URL } from '../constants/constants';

const posts = 'posts';
const users = 'users';
const comments = 'comments';

const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(`${BASE_URL}${url}`);

  return response.json();
};

export const getPosts = async () => {
  return getData<Post[]>(posts);
};

export const getUsers = async () => {
  return getData<User[]>(users);
};

export const getComments = async () => {
  return getData<Comment[]>(comments);
};
