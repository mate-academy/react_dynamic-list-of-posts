export const getUsers = () => {
  return fetch('https://mate.academy/students-api/users')
    .then(response => response.json());
};
