const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api';

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface Users {
  id: number;
  name: string;
  email: string;
  address: Address;
}

export interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Comments {
  postId: number;
  id: number;
  name: string;
  body: string;
  email: string;
}

export interface PostWithUser {
  userId: number;
  id: number;
  title: string;
  body: string;
  user: Users;
  comments: Comments[];
}

const getAll = <T>(url: string): Promise<T[]> => {
  return fetch(API_URL + url)
    .then(response => response.json());
};

export const posts = () => getAll<Posts>('/posts.json');

export const users = () => getAll<Users>('/users.json');

export const comments = () => getAll<Comments>('/comments.json');

export const getPosts = async (): Promise<PostWithUser[]> => {
  const [
    postsFromServer,
    usersFromServer,
    commentsFromServer,
  ] = await Promise.all([posts(), users(), comments()]);

  return postsFromServer.map((post) => ({
    ...post,
    user: usersFromServer.find((user) => user.id === post.userId) as Users,
    comments: commentsFromServer.filter((comment) => comment.postId === post.id),
  }));
};
