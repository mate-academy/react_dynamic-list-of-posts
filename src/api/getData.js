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

export const getComments = async() => {
  const url = 'https://jsonplaceholder.typicode.com/comments';

  return fetch(url)
    .then(response => response.json());
};

export const getData = async() => {
  const posts = await getPosts();
  const users = await getUsers();

  return posts.map(post => ({
    ...post,
    user: users.find(user => user.id === post.userId),
  }));
};
