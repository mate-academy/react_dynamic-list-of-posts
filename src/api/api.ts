const POSTS_URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/posts.json';
const USERS_URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/users.json';
const COMMENTS_URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/comments.json';

export const getPreparedPosts = async (): Promise<Post[]> => {
  const posts = await fetch(POSTS_URL).then(response => response.json());
  const users = await fetch(USERS_URL).then(response => response.json());
  const comments = await fetch(COMMENTS_URL).then(response => response.json());

  return posts.map((post: Post) => ({
    ...post,
    user: users.find((user: User) => user.id === post.userId),
    comments: comments.filter((comment: Comment) => comment.postId === post.id),
  }));
};
