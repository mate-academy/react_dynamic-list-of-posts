const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/';

const getAll = <T> (url: string): Promise<T[]> => {
  return fetch(API_URL + url)
    .then(responce => responce.json());
};

export const getPosts = () => getAll<Post>('posts.json');
export const getUsers = () => getAll<User>('users.json');
export const getComments = () => getAll<Comment>('comments.json');
