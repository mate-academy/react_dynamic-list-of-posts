const BASE_URL = `https://mate-api.herokuapp.com`;

const request = url => fetch(`${BASE_URL}${url}`)
  .then(res => res.json())
  .then(res => res.data)
  .catch(error => error);

export const getUserPosts = userId => request(`/posts/${userId}`);
export const usersPosts = () => request('/posts');
export const usersDataFromServer = () => request(`/users`);
