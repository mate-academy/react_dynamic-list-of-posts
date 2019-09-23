export const comments = () => {
  return fetch('https://jsonplaceholder.typicode.com/comments').then(response =>
    response.json()
  );
};

