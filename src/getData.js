const getPosts = async() => {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const response = await fetch(url);
  const posts = await response.json();

  return posts;
};

const getUsers = async() => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const response = await fetch(url);
  const users = await response.json();

  return users;
};

const getComments = async() => {
  const url = 'https://jsonplaceholder.typicode.com/comments';
  const response = await fetch(url);
  const comments = await response.json();

  return comments;
};

const getData = async() => {
  const posts = await getPosts();
  const users = await getUsers();
  const comments = await getComments();

  return [...posts].map(post => ({
    ...post,
    user: users.find(user => user.id === post.userId),
    commentsList: comments.filter(comment => comment.postId === post.id),
  }));
};

export default getData;
