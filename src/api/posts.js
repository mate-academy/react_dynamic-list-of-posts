const BASE_URL = 'https://mate-api.herokuapp.com';

export const GetUserPosts = userId => fetch(`${BASE_URL}/posts`)
  .then(response => response.json())
  .then(user => (userId === 0
    ? user.data
    : user.data.filter(post => post.userId === userId)));

export const GetPostDetails = postId => fetch(`${BASE_URL}/posts/${postId}`)
  .then(response => response.json())
  .then(res => res.data);
