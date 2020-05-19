const urlPosts = 'https://jsonplaceholder.typicode.com/posts';
const urlUsers = 'https://jsonplaceholder.typicode.com/users';
const urlComments = 'https://jsonplaceholder.typicode.com/comments';

const get = async (url: string) => {
  const response = await fetch(url).then(resolve => resolve.json());

  return response;
};

export const getElements = async () => {
  const response = await Promise.all([
    get(urlPosts),
    get(urlUsers),
    get(urlComments),
  ]);

  return response;
};
