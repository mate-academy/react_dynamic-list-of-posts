const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api';

const getAll = <T>(url: string): Promise<T[]> => {
  return fetch(API_URL + url)
    .then(response => response.json());
};

export const posts = () => getAll<PostType>('/posts.json');

export const users = () => getAll<UserType>('/users.json');

export const comments = () => getAll<CommentType>('/comments.json');

export const getPosts = async (): Promise<PostType[]> => {
  const [
    postsFromServer,
    usersFromServer,
    commentsFromServer,
  ] = await Promise.all([posts(), users(), comments()]);

  return postsFromServer.map((post) => ({
    ...post,
    user: usersFromServer.find((user) => user.id === post.userId) as UserType,
    comments: commentsFromServer.filter((comment) => comment.postId === post.id),
  }));
};
