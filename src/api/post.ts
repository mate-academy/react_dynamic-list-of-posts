export const getUserPosts = (userId: number) => {
  if (userId === 0) {
    return fetch('https://mate.academy/students-api/posts')
      .then(response => response.json());
  }

  return fetch(`https://mate.academy/students-api/posts?userId=${userId}`)
    .then(response => response.json());
};

export const getPostDetails = (postId: number) => {
  return fetch(`https://mate.academy/students-api/posts/${postId}`)
    .then(response => response.json());
};
