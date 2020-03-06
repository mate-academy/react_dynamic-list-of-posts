import {
  BASE_URL,
  POSTS_URL,
  USERS_URL,
  COMMENTS_URL,
} from './constants';


export const getData = async <T>(url: string): Promise<T> => {
  return fetch(url)
    .then(response => response.json());
};

export const getPosts = async (): Promise<Post[]> => {
  return getData<Post[]>(BASE_URL + POSTS_URL);
};

export const getUsers = async (): Promise<User[]> => {
  return getData<User[]>(BASE_URL + USERS_URL);
};

export const getComments = async (): Promise<Comment[]> => {
  return getData<Comment[]>(BASE_URL + COMMENTS_URL);
};

const postsPromise: Promise<Post[]> = getPosts();
const usersPromise: Promise<User[]> = getUsers();
const commentsPromise: Promise<Comment[]> = getComments();

export const getCorrectPosts = Promise.all([
  postsPromise,
  usersPromise,
  commentsPromise,
])
  .then(([posts, users, comments]) => {
    return posts.map((post) => ({
      ...post,
      user: users
        .find(user => user.id === post.userId) as User,
      postComments: comments
        // tsLint-disable
        .filter(comment => comment.postId === post.id) as Comment[],
    }));
  });
