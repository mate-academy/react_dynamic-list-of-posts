export const getPosts = () => {
  return fetch(`https://jsonplaceholder.typicode.com/posts`).then(response =>
    response.json()
  );
};
