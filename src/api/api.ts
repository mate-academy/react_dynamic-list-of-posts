const API__URL__POSTS = 'https://jsonplaceholder.typicode.com/posts';
const API__URL__USERS = 'https://jsonplaceholder.typicode.com/users';
const API__URL__COMMENTS = 'https://jsonplaceholder.typicode.com/comments';

const posts = () => {
  return fetch(`${API__URL__POSTS}`)
    .then(response => response.json());
};

const users = () => {
  return fetch(`${API__URL__USERS}`)
    .then(response => response.json());
};

const comments = () => {
  return fetch(`${API__URL__COMMENTS}`)
    .then(response => response.json());
};

export const getPosts = async () => {
  const [postsData, usersData, commentsData] = await Promise.all([posts(), users(), comments()]);

  return postsData.map((post: PostFromServer) => {
    const postUser = usersData.find((user: UserFromServer) => user.id === post.userId);
    const postComment = commentsData
      .filter((comment: CommentFromServer) => comment.postId === post.id);

    return {
      ...post, postUser, postComment,
    };
  });
};
