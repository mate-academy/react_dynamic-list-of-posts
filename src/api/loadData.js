export const postsLink = 'https://jsonplaceholder.typicode.com/posts';
export const usersLink = 'https://jsonplaceholder.typicode.com/users';
export const commentsLink = 'https://jsonplaceholder.typicode.com/comments';

export const loadData = async(link) => {
  let loadedData = await fetch(link);
  loadedData = await loadedData.json();
  return loadedData;
};
