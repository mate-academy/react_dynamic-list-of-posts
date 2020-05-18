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

export const getPosts = async () => {
  const [
    postsData,
    usersData,
    commentsData
  ] = await Promise.all([posts(), users(), comments()]);

  return postsData.map((post: PostFromServer) => {
    const postUser = usersData.find((user: UserFromServer) => user.id === post.userId);
    const postComment = commentsData
      .filter((comment: CommentFromServer) => comment.postId === post.id);

    return {
      ...post, postUser, postComment,
    };
  });
};
