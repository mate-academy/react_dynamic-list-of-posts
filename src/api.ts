const API_URL = 'https://jsonplaceholder.typicode.com';

const posts = () => {
  return fetch(`${API_URL}/posts`)
    .then(response => response.json());
};

const users = () => {
  return fetch(`${API_URL}/users`)
    .then(response => response.json());
};

const comments = () => {
  return fetch(`${API_URL}/comments`)
    .then(response => response.json());
};

export const preparedPosts = async () => {
  const [
    postsData,
    usersData,
    commentsData,
  ] = await Promise.all([posts(), users(), comments()]);

  return postsData.map((post: PreparedPost) => ({
    ...post,
    user: usersData.find((user: User) => user.id === post.userId),
    comments: commentsData.filter((comment: Comment) => post.id === comment.postId),
  }));
};
