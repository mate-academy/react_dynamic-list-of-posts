import { API_URL } from './constants';

export const getData = <T>(url: string): Promise<T> => fetch(url).then(response => response.json());
export const getPosts = (): Promise<PostInterface[]> => getData<PostInterface[]>(`${API_URL}posts`);
export const getUsers = (): Promise<UserInterface[]> => getData<UserInterface[]>(`${API_URL}users`);
export const getComments = (): Promise<CommentInterface[]> => getData<CommentInterface[]>(`${API_URL}comments`);

export const getPreparedPosts = async () => {
  const posts: PostInterface[] = await getPosts();
  const users: UserInterface[] = await getUsers();
  const comments: CommentInterface[] = await getComments();

  return (posts.map(post => ({
    ...post,
    user: users.find(user => user.id === post.userId) as UserInterface,
    comments: comments.filter(comment => comment.postId === post.id) as CommentInterface[],
  })));
};
