const API_URL = 'https://jsonplaceholder.typicode.com/';

const getAll = <T> (url: string): Promise<T[]> => {
  return fetch(API_URL + url)
    .then(responce => responce.json());
};

export const getPosts = () => getAll<Post>('posts');
export const getUsers = () => getAll<User>('users');
export const getComments = () => getAll<Comment>('comments');
