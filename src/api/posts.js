const BASE_URL = 'https://mate-api.herokuapp.com';

export function getPostDetails(postID) {
  return fetch(`${BASE_URL}/posts/${+postID}`)
    .then(response => response.json())
    .then(result => result.data);
}

export const getUserPosts = async(userId) => {
  const response = await fetch(`${BASE_URL}/posts/`);
  const result = await response.json();

  return userId
    ? result.data.filter(post => post.userId === userId)
    : result.data;
};
