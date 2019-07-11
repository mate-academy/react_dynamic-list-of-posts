export const loadPosts = async() => {
  let loadedData = await fetch('https://jsonplaceholder.typicode.com/posts');
  loadedData = await loadedData.json();
  return loadedData;
};

export const loadUsers = async() => {
  let loadedData = await fetch('https://jsonplaceholder.typicode.com/users');
  loadedData = await loadedData.json();
  return loadedData;
};

export const loadComments = async() => {
  let loadedData = await fetch('https://jsonplaceholder.typicode.com/comments');
  loadedData = await loadedData.json();
  return loadedData;
};
