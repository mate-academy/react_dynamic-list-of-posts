import { Posts, Users, Comments } from './helper';

const ApoUrl = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api';

const getAll = <T>(url: string): Promise<T[]> => {
  return fetch(ApoUrl + url)
    .then(response => response.json());
};

export const getPost = () => getAll<Posts>('/posts.json');
export const getUsers = () => getAll<Users>('/users.json');
export const getComments = () => getAll<Comments>('/comments.json');
