
const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api';

const getInfoFromServer = <T>(url: string): Promise<T[]> => {
  return fetch(API_URL + url)
    .then(response => response.json());
};

export const getPosts = () => getInfoFromServer<Post>('/posts.json');
export const getComments = () => getInfoFromServer<Comment>('/comments.json');
export const getUsers = () => getInfoFromServer<User>('/users.json');
