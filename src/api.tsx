const API_USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const API_POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const API_COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';


export const getUsers = () => {
  return fetch(API_USERS_URL)
    .then(response => response.json());
};

export const getPosts = () => {
  return fetch(API_POSTS_URL)
    .then(response => response.json());
};

export const getComments = () => {
  return fetch(API_COMMENTS_URL)
    .then(response => response.json());
};

// export const getPreparedPosts = async () => {
//   const [postFromServer, usersFromServer, commentsFromServer] = await Promise.all([
//     getUsers(),
//     getPosts(),
//     getComments(),
//   ]);

//  return postFromServer.map((post: Post) => ({
//     ...post,
//     user: usersFromServer.find((user: User) => user.id === post.userId),
//     comments: commentsFromServer.filter((comment: Comment) => comment.postId === post.id),
//   }));
// };
