const API_URL = 'https://jsonplaceholder.typicode.com';

const getData = async(url: string) => {
  const response = await fetch(API_URL + url);

  if (response.ok) {
    return response.json();
  }

  return [];
};

export const getPosts = () => getData('/posts');
export const getUsers = () => getData('/users');
export const getComments = () => getData('/comments');
