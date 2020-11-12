const BASE_URL = `https://mate-api.herokuapp.com`;

const request = url => fetch(`${BASE_URL}${url}`)
  .then(res => res.json())
  .then(res => res.data)
  .catch(error => error);

//   // return res.data;
// // }
// // const request = async(url, options) => {
// //   const response = await fetch(`${BASE_URL}${url}`, options);

// //   if (!response.ok) {
// //     throw new Error(`${response.status} - ${response.statusText}`);
// //   }

// //   const result = await response.json();

// //   return result.data;
// // };

export const getUserPosts = userId => request(`/users/${userId}`);
export const usersDataFromServer = () => request(`/users`);
// import { request } from './api';

// export const getUserPosts = async(userId) => {
//   const posts = await request('/posts');

//   return (
//     userId
//       ? posts.filter(post => post.userId === userId)
//       : posts
//   );
// };

// export const getPostDetails = async(postId) => {
//   const postDetails = await request(`/posts/${postId}`);

//   return postDetails;
// };
