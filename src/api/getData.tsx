import { Post, User, Comment } from '../components/Interface';

const API_URL = 'https://jsonplaceholder.typicode.com';
const API_URL_POSTS = `${API_URL}/posts/`;
const API_URL_USERS = `${API_URL}/users/`;
const API_URL_COMMENTS = `${API_URL}/comments/`;

const getData = async (url: string) => {
  const response = await fetch(url);
  const json = await response.json();

  return json;
};

export const preparePosts = async () => {
  const [posts, users, comments] = await Promise.all([
    getData(API_URL_POSTS),
    getData(API_URL_USERS),
    getData(API_URL_COMMENTS),
  ]);


  const preparedPosts = posts.map((post: Post) => {
    return {
      ...post,
      user: users.find((user: User) => user.id === post.userId),
      comments: comments.filter((comment: Comment) => comment.postId === post.id),
    };
  });

  return preparedPosts;
};
