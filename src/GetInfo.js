export const getUsers = async() => {
  const url1 = 'https://jsonplaceholder.typicode.com/users';
  const response = await fetch(url1);
  const result = response.json();

  return result;
};

export const getPosts = async() => {
  const url2 = 'https://jsonplaceholder.typicode.com/posts';
  const response = await fetch(url2);
  const result = response.json();

  return result;
};

export const getComments = async() => {
  const url3 = 'https://jsonplaceholder.typicode.com/comments';
  const response = await fetch(url3);
  const result = response.json();

  return result;
};
