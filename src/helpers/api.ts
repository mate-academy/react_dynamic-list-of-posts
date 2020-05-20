// eslint-disable-next-line object-curly-newline
import { User, Comment, Post, PostWithUser } from './typeDefs';

const BASE_URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api';

const getAll = async <T>(url: string): Promise<T[]> => {
  const response = await fetch(BASE_URL + url);

  return response.json();
};

export const getPosts = () => getAll<Post>('/posts.json');
export const getUsers = () => getAll<User>('/users.json');
export const getComments = () => getAll<Comment>('/comments.json');

export const getAllPosts = async (): Promise<PostWithUser[]> => {
  const [
    postsFromServer,
    usersFromServer,
    commentsFromServer,
  ] = await Promise.all([getPosts(), getUsers(), getComments()]);

  return postsFromServer.map((post) => ({
    ...post,
    user: usersFromServer.find((user) => user.id === post.userId) as User,
    comments: commentsFromServer.filter((comment) => comment.postId === post.id),

  }));
};
