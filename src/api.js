const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';

const getPosts = () => (
  fetch(POSTS_URL)
    .then(response => response.json())
);

const getUsers = () => (
  fetch(USERS_URL)
    .then(response => response.json())
);

const getComments = () => (
  fetch(COMMENTS_URL)
    .then(response => response.json())
);

const getPostsWithDependencies = async() => {
  const postList = await getPosts();
  const userList = await getUsers();
  const commentList = await getComments();

  return postList.map(post => (
    {
      ...post,
      comments: commentList.filter(comment => comment.postId === post.id),
      user: userList.find(user => user.id === post.userId),
    }
  ));
};

export default getPostsWithDependencies;
