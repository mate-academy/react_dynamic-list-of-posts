import {
  BASE_URL,
  POSTS_URL,
  USERS_URL,
  COMMENTS_URL,
} from './constants';


const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(BASE_URL + url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json()
    .catch(error => error);
};


const postsPromise: Promise<Post[]> = getData<Post[]>(POSTS_URL);
const usersPromise: Promise<User[]> = getData<User[]>(USERS_URL);
const commentsPromise: Promise<Comment[]> = getData<Comment[]>(COMMENTS_URL);

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
