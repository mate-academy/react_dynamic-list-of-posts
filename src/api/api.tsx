const apiUrlPosts = 'https://jsonplaceholder.typicode.com/posts';
const apiUrlUsers = 'https://jsonplaceholder.typicode.com/users';
const apiUrlComments = 'https://jsonplaceholder.typicode.com/comments';

const get = async (url: string) => {
  const response = await fetch(url).then(resolve => resolve.json());

  return response;
};

export const getData = async () => {
  const response = await Promise.all([
    get(apiUrlPosts),
    get(apiUrlUsers),
    get(apiUrlComments),
  ]);

  return response;
};
