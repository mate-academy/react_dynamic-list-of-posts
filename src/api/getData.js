const getPosts = async() => {
  const url = 'https://jsonplaceholder.typicode.com/posts';

  return fetch(url)
    .then(response => response.json());
};

const getUsers = async() => {
  const url = 'https://jsonplaceholder.typicode.com/users';

  return fetch(url)
    .then(response => response.json());
};

const getComments = async() => {
  const url = 'https://jsonplaceholder.typicode.com/comments';

  return fetch(url)
    .then(response => response.json());
};

const getData = async() => {
  const posts = await getPosts();
  const users = await getUsers();
  const comments = await getComments();

  return posts.map(post => ({
    ...post,
    user: users.find(user => user.id === post.userId),
    comments: comments.filter(comment => comment.postId === post.id),
  }));
};

export default getData;
