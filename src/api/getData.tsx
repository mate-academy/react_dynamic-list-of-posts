import { Post, User, Comment } from '../components/Interface';

const API_URL = './api';

const getData = async (url: string) => {
  const response = await fetch(url);
  const json = await response.json();

  return json;
};

export const preparePosts = async () => {
  const [posts, users, comments] = await Promise.all([
    getData(`${API_URL}/posts.json`),
    getData(`${API_URL}/users.json`),
    getData(`${API_URL}/comments.json`),
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
