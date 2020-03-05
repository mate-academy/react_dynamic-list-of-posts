const BASE_URL = 'https://jsonplaceholder.typicode.com/';

const getData = async <T>(keyWord: string): Promise<T> => {
  const url = BASE_URL + keyWord;

  const response = await fetch(url);
  const data = await response.json();

  return data;
};

const getPosts = () => {
  return getData<PostInterface[]>('posts');
};

const getUsers = () => {
  return getData<UserInterface[]>('users');
};

const getComments = () => {
  return getData<CommentInterface[]>('comments');
};

export const getCompletePosts = async () => {
  const [posts, users, comments] = await Promise.all([getPosts(), getUsers(), getComments()]);

  const completePosts = posts.map(post => ({
    ...post,
    user: users.find(item => item.id === post.userId),
    comments: comments.filter(item => item.postId === post.id),
  })) as PostInterface[];

  return completePosts;
};
