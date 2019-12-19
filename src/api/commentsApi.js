export const getCommentsResolvedPromise = async() => {
  const response = await fetch('https://jsonplaceholder.typicode.com/comments');
  const result = await response.json();

  return result;
};
