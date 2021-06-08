export const getUserPosts = (userId) => {
  if (userId === '0') {
    return fetch(`https://mate-api.herokuapp.com/posts`)
      .then(response => response.json());
  }

  return fetch(`https://mate-api.herokuapp.com/posts?userId=${userId}`)
    .then(response => response.json());
};

export const getPostDetails = postId => fetch(
  `https://mate-api.herokuapp.com/posts/${postId}`,
)
  .then(response => response.json());
