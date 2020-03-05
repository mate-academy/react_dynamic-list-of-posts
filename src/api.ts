import {
  Post, User, Comments, PreparedPosts,
} from './interfaces';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const POSTS_URL = '/posts';
const USERS_URL = '/users';
const COMMENTS_URL = '/comments';

const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(`${BASE_URL}${url}`);

  return response.json();
};

const getPosts = (): Promise<Post[]> => {
  return getData<Post[]>(POSTS_URL);
};

const getUsers = (): Promise<User[]> => {
  return getData<User[]>(USERS_URL);
};

const getComments = (): Promise<Comments[]> => {
  return getData<Comments[]>(COMMENTS_URL);
};

export const getPostsWithUsersComments = async (): Promise<PreparedPosts[]> => {
  const posts: Post[] = await getPosts();
  const users: User[] = await getUsers();
  const commentsPost: Comments[] = await getComments();

  return posts.map(post => {
    const user = users.find(person => person.id === post.userId) as User;
    const comments = commentsPost
      .filter(message => message.postId === post.userId) as Comments[];

    return {
      ...post,
      user,
      comments,
    };
  });
};
