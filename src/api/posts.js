const POSTS_URL = 'https://mate-api.herokuapp.com/posts';

export const getUserPosts = async(userId) => {
  const response = await fetch(`${POSTS_URL}`);
  const result = await response.json();
  const posts = await result.data;

  if (userId === 0) {
    return posts;
  }

  return posts.filter(post => post.userId === userId);
};

export const getPostDetails = async(postId) => {
  const response = await fetch(`${POSTS_URL}/${postId}`);
  const result = await response.json();
  const post = await result.data;

  return post;
};
