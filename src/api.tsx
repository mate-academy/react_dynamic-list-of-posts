const BASE_URL = 'https://jsonplaceholder.typicode.com';

const getPosts = () => {
  return fetch(`${BASE_URL}/posts`)
    .then(posts => posts.json());
};

const getUsers = () => {
  return fetch(`${BASE_URL}/users`)
    .then(users => users.json());
};

const getComments = () => {
  return fetch(`${BASE_URL}/comments`)
    .then(comments => comments.json());
};

export const preparedPostList = async () => {
  const [posts, users, comments] = await Promise.all([
    getPosts(), getUsers(), getComments(),
  ]);

  return posts.map((post: Post) => {
    return {
      ...post,
      user: users.find((user: User) => user.id === post.userId),
      comments: comments.filter((comment: Comment) => comment.postId === post.id),
    };
  });
};
