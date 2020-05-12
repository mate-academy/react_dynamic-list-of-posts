import { Post, User, Comment } from '../components/Interface';

const API_URL = 'https://seialek.github.io/react_dynamic-list-of-posts/api';

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

  return posts.map((post: Post) => ({
    ...post,
    user: users.find((user: User) => user.id === post.userId),
    comments: comments.filter((comment: Comment) => comment.postId === post.id),
  }));
};
