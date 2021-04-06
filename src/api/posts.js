import { BASE_URL } from './api';

export const getUserPosts = async() => {
  const response = await fetch(`${BASE_URL}/posts`);
  const responseJSON = await response.json();
  const { data } = responseJSON;

  return data;
};

export const getPostDetails = async(postId) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);
  const data = await response.json();

  return data;
};

// export const createPost = async() => {
//   const response = await fetch(`${BASE_URL}/comments/256`, {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8',
//     },
//     body: JSON.stringify({
//       id: 256,
//       body: 'comment',
//     }),
//   });
//   const data = await response.json();

//   return data;
// };

// // createPost();
