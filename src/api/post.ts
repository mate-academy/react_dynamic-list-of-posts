export const BASE_URL = 'https://mate.academy/students-api';

export const getUserPosts = () => {
  return fetch(`${BASE_URL}/posts?userId=4`)
    .then(respond => {
      if (!respond.ok) {
        throw new Error(`${respond.status} - ${respond.statusText}`);
      }

      return respond.json();
    });
};
