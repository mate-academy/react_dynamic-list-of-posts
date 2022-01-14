const BASE_URL = 'https://mate.academy/students-api/posts?userId=';

export const getAllPosts = () => {
  return fetch('https://mate.academy/students-api/posts')
    .then(response => response.json());
};

export const getUserPosts = (userId: number) => {
  return fetch(`${BASE_URL}${userId}`)
    .then(response => response.json());
};

export const getPost = (postId: number) => {
  return fetch(`https://mate.academy/students-api/posts/${postId}`)
    .then(responce => responce.json());
};
