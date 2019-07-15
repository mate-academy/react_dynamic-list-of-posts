const url = 'https://jsonplaceholder.typicode.com';

export const getUsers = async() => {
  const response = await fetch(`${url}/users`);
  const users = await response.json();

  return users;
};

export const getPosts = async() => {
  const response = await fetch(`${url}/posts`);
  const posts = await response.json();

  return posts;
};

export const getComments = async() => {
  const response = await fetch(`${url}/comments`);
  const comments = await response.json();

  return comments;
};

const preparedData = async() => {
  const users = await getUsers();
  const posts = await getPosts();
  const comments = await getComments();

  const filteredPostList = posts.map(post => ({
    ...post,
    user: users.find(user => user.id === post.userId),
    comments: comments.filter(comment => comment.postId === post.id),
  }));

  return filteredPostList;
};

export default preparedData;
