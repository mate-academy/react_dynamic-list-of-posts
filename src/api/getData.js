const myUrl = 'https://jsonplaceholder.typicode.com';

export const getPosts = async() => {
  const responsePosts = await fetch(`${myUrl}/posts`);
  const posts = await responsePosts.json();

  return posts;
};

export const getUsers = async() => {
  const responseUsers = await fetch(`${myUrl}/users`);
  const users = await responseUsers.json();

  return users;
};

export const getComments = async() => {
  const responseComments = await fetch(`${myUrl}/comments`);
  const comments = await responseComments.json();

  return comments;
};
