const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

export const postsFromServer = async() => {
  const response = await fetch(POSTS_URL);

  return response.json();
};
