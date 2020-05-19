const API_URL = 'https://jsonplaceholder.typicode.com';

interface User {
  id: number;
  name: string;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  body: string;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  user?: User;
  commentList?: Comment[];
}

const getAll = <E>(url: string): Promise<E[]> => {
  return fetch(API_URL + url)
    .then(response => response.json());
};

export const debounce = (f: React.Dispatch<React.SetStateAction<string>>, delay: number) => {
  let timerId: ReturnType<typeof setTimeout>;

  return (value: string) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      f(value);
    }, delay);
  };
};

export const getUsers = () => getAll<User>('/users');

export const getPosts = () => getAll<Post>('/posts');

export const getComments = () => getAll<Comment>('/comments');
