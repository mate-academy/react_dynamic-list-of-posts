const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';

async function loadData(url) {
  return fetch(url).then(response => response.json());
}

const getPostsWithDependencies = async () => {
  const postList = await loadData(POSTS_URL);
  const userList = await loadData(USERS_URL);
  const commentList = await loadData(COMMENTS_URL);

  return postList.map(post => (
    {
      ...post,
      comments: commentList.filter(comment => comment.postId === post.id),
      user: userList.find(user => user.id === post.userId),
    }
  ));
};

export default getPostsWithDependencies;
