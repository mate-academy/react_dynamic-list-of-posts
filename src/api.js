const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';

const getPostsWithDependencies = async () => {
  const postList = await fetch(POSTS_URL)
    .then(response => response.json());
  const userList = await fetch(USERS_URL)
    .then(response => response.json());
  const commentList = await fetch(COMMENTS_URL)
    .then(response => response.json());

  return postList.map(post => (
    {
      ...post,
      comments: commentList.filter(comment => comment.postId === post.id),
      user: userList.find(user => user.id === post.userId),
    }
  ));
};

export default getPostsWithDependencies;
