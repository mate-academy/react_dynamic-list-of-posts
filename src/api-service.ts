
const API_URL = 'https://jsonplaceholder.typicode.com';

const getData = <T>(url: string): Promise<T[]> => {
  return fetch(API_URL + url).then((response) => response.json());
};

export const getUsers = () => {
  return getData<User>('/users');
};

export const getPosts = () => {
  return getData<Post>('/posts');
};

export const getComments = () => {
  return getData<Comment>('/comments');
};
