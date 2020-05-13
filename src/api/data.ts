const API_URL = 'https://jsonplaceholder.typicode.com';

const getPosts = () => {
  return fetch(`${API_URL}/posts`)
    .then(response => response.json());
};

const getUsers = () => {
  return fetch(`${API_URL}/users`)
    .then(response => response.json());
};

const getComments = () => {
  return fetch(`${API_URL}/comments`)
    .then(response => response.json());
};

export const getPreparedPosts = async () => {
  const [posts, users, comments] = await Promise.all([
    getPosts(),
    getUsers(),
    getComments(),
  ]);

  const preparedPosts = posts.map((post: Post) => ({
    ...post,
    user: users.find((user: User) => user.id === post.userId),
    comments: comments.filter((comment: Comment) => comment.postId === post.id),
  }));

  return preparedPosts;
};
