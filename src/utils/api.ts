import {
  BASE_URL,
  POSTS_URL,
  USERS_URL,
  COMMENTS_URL,
} from './constants';


const getData = async <T>(url: string): Promise<T> => {
  return fetch(url)
    .then(response => response.json());
};


const postsPromise: Promise<Post[]> = getData<Post[]>(BASE_URL + POSTS_URL);
const usersPromise: Promise<User[]> = getData<User[]>(BASE_URL + USERS_URL);
const commentsPromise: Promise<Comment[]> = getData<Comment[]>(BASE_URL + COMMENTS_URL);

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
        .filter(comment => comment.postId === post.id) as Comment[],
    }));
  });
