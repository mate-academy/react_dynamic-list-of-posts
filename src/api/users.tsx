export const getUsers = (userId = '') => {
  return fetch(`https://mate.academy/students-api/users${userId ? `/${userId}` : ''}`).then(response => response.json());
};
