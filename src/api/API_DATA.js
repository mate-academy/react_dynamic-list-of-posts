
export const loadPosts = async() => {
  const urlPosts = 'https://jsonplaceholder.typicode.com/posts';
  const responsePosts = await fetch(urlPosts);
  const posts = await responsePosts.json();

  return posts;
};

export const loadUsers = async() => {
  const urlUsers = 'https://jsonplaceholder.typicode.com/users';
  const responseUsers = await fetch(urlUsers);
  const users = await responseUsers.json();

  return users;
};

export const loadComments = async() => {
  const urlComments = 'https://jsonplaceholder.typicode.com/comments';
  const responseComments = await fetch(urlComments);
  const comments = await responseComments.json();

  return comments;
};
