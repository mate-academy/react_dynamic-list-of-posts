const BASE_URL = 'https://jsonplaceholder.typicode.com/';

const getData = async <T>(keyWord: string): Promise<T> => {
  const url = BASE_URL + keyWord;

  const response = await fetch(url);
  const data = await response.json();

  return data;
};

const getPosts = (): Promise<PostInterface[]> => {
  return getData<PostInterface[]>('posts');
};

const getUsers = (): Promise<UserInterface[]> => {
  return getData<UserInterface[]>('users');
};

const getComments = (): Promise<CommentInterface[]> => {
  return getData<CommentInterface[]>('comments');
};

export const getCompletePosts = async (): Promise<CompletePostInterface[]> => {
  const [posts, users, comments] = await Promise.all([
    getPosts(),
    getUsers(),
    getComments(),
  ]);

  const completePosts = posts.map(post => ({
    ...post,
    user: users.find(item => item.id === post.userId),
    comments: comments.filter(item => item.postId === post.id),
  })) as CompletePostInterface[];

  return completePosts;
};
