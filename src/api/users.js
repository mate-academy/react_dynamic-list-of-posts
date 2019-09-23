export const users = () => {
  return fetch('https://jsonplaceholder.typicode.com/users').then(response =>
    response.json()
  );
};

