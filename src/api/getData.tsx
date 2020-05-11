import { Post, User, Comment } from '../components/Interface';

const API_URL_POSTS = 'https://jsonplaceholder.typicode.com/posts';
const API_URL_USERS = 'https://jsonplaceholder.typicode.com/users';
const API_URL_COMMENTS = 'https://jsonplaceholder.typicode.com/comments';

const getData = async (url: string) => {
  const response = await fetch(url);
  const json = await response.json();

  return json;
};

export const preparePosts = async () => {
  const posts: Post[] = await getData(API_URL_POSTS);
  const users: User[] = await getData(API_URL_USERS);
  const comments: Comment[] = await getData(API_URL_COMMENTS);

  const preparedPosts = posts.map((post) => {
    return {
      ...post,
      user: users.find(user => user.id === post.userId),
      comments: comments.filter(comment => comment.postId === post.id),
    };
  });

  return preparedPosts;
};
