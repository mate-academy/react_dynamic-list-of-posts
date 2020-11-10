export const BASE_URL = 'https://mate-api.herokuapp.com';
export const POSTS_URL = '/posts';
export const USERS_URL = '/users';
export const COMMENTS_URL = '/comments';

export const request = async(url, option) => {
  const response = await fetch(url, option);
  const posts = await response.json();

  return posts.data;
};

export const remove = url => request(url, { method: 'DELETE' });

export const post = (url, data) => (
  request(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  })
);
