const API_URL = 'https://jsonplaceholder.typicode.com';

export interface Post {
  id: number;
  userId: number;
  body: string;
  title: string;
  user?: User;
  comments?: Comment[];
}

export interface User {
  id: number;
  name: string;
}

export interface Comment {
  id: number;
  postId: number;
  body: string;
  name: string;
}

const getDataFromServer = <T>(url: string): Promise<T[]> => {
  return fetch(API_URL + url)
    .then(response => response.json());
};

export const getPosts = () => getDataFromServer<Post>('/posts');
export const getUsers = () => getDataFromServer<User>('/users');
export const getComments = () => getDataFromServer<Comment>('/comments');
