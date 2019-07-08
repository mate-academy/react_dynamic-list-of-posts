export const usersFromServer = () => {
  return fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json());
};

export const postsFromServer = () => {
  return fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json());
};

export const commentsFromServer = () => {
  return fetch('https://jsonplaceholder.typicode.com/comments').then(res => res.json());
};
