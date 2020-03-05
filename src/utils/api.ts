import {
  BASE_URL,
  USERS_URL,
  POSTS_URL,
  COMMENTS_URL,
} from '../constants/api';

import {
  UserInterface,
  PostInterface,
  CommentInterface,
  PostsWithUserAndComments,
} from '../constants/types';

const getDataFromServer = async <T>(url: string): Promise<T> => {
  const data = await fetch(`${BASE_URL}${url}`);

  return data.json();
};

const getUsers: () => Promise<UserInterface[]> = async () => {
  const users = await getDataFromServer<UserInterface[]>(USERS_URL);

  return users;
};

const getComments: () => Promise<CommentInterface[]> = async () => {
  const comments = await getDataFromServer<CommentInterface[]>(COMMENTS_URL);

  return comments;
};

const getPosts: () => Promise<PostInterface[]> = async () => {
  const posts = await getDataFromServer<PostInterface[]>(POSTS_URL);

  return posts;
};

export const getPostsWithUserAndComments: () => Promise<PostsWithUserAndComments[]> = async () => {
  const [users, comments, posts] = await Promise.all([
    getUsers(),
    getComments(),
    getPosts(),
  ]);

  const postsWithUserAndComments = posts.map((post: PostInterface) => {
    const user = users
      .find((person: UserInterface) => person.id === post.userId) as UserInterface;
    const commentsByUser = comments
      .filter((article: CommentInterface) => article.postId === post.id) as CommentInterface[];

    return {
      ...post,
      user,
      comments: commentsByUser,
    };
  });

  return postsWithUserAndComments;
};

export function searchCallback(query: string) {
  return (post: PostsWithUserAndComments) => post.title.includes(query)
    || post.body.includes(query);
}
