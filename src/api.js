const URLPosts = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/posts.json';
const URLUsers = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/users.json';
const URLComments = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/comments.json';

export const getPosts = async () => {
  const data = await fetch(URLPosts)
    .then(response => response.json());

  return data;
};

export const getUsers = async () => {
  const data = await fetch(URLUsers)
    .then(response => response.json());

  return data;
};

export const getComments = async () => {
  const data = await fetch(URLComments)
    .then(response => response.json());

  return data;
};
