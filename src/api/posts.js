const BASE_URL = 'https://mate-api.herokuapp.com/posts';

export const getPosts = async(userId) => {
  const posts = await fetch(`${BASE_URL}`);

  if (userId) {
    return posts.json()
      .then(result => result.data.filter(post => post.userId === userId));
  }

  return posts.json()
    .then(result => result.data);
};

export const getPostDetails = async(userId) => {
  const post = await fetch(`${BASE_URL}/${userId}`);

  return post.json()
    .then(result => result.data);
};
