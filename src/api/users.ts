export const getUsers = () => {
  return fetch('https://mate.academy/students-api/users')
    .then(res => res.json());
};
