const POSTS_URL = 'https://mate-api.herokuapp.com/posts';

export const getUserPosts = async(userId) => {
  const posts = fetch(`${POSTS_URL}`)
    .then(promise => promise.json())
    .then(result => (userId
      ? result.data.filter(post => post.userId === userId)
      : result.data));

  return posts;
};

export const getPostDetails = (postId) => {
  const posts = fetch(`${POSTS_URL}/${postId}`)
    .then(promise => promise.json())
    .then(result => result.data);

  return posts;
};
