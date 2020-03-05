import { UserInterface, Post, CommentInterface, PreparedPost } from './types';

const API_URL = 'https://jsonplaceholder.typicode.com/';

export const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  return response.json();
}

export const getPosts = (): Promise<Post[]> => {
  return getData<Post[]>(`${API_URL}posts`);
};

export const getUsers = (): Promise<UserInterface[]> => {
  return getData<UserInterface[]>(`${API_URL}users`);
};

export const getComments = (): Promise<CommentInterface[]> => {
  return getData<CommentInterface[]>(`${API_URL}comments`);
};


export const getPreparedPosts = async (): Promise<PreparedPost[]> => {
  const users: UserInterface[] = await getUsers();
  const posts: Post[] = await getPosts();
  const comments: CommentInterface[] = await getComments();

  const preparedPosts: PreparedPost[] = posts.map(post => (
    {
      ...post,
      user: users.find(user => post.userId === user.id),
      comments: comments.filter(comment => post.id === comment.postId),
    }
  ));

  return preparedPosts
}
