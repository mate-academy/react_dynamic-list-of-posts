import { BASE_URL } from './api';

export const getUserPosts = async(userId) => {
  const response = await fetch(`${BASE_URL}/posts`);
  const result = await response.json();

  if (!userId) {
    return result.data;
  }

  return result.data.filter(post => post.userId === userId);
};

export const getPostDetails = async(postId) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);
  const result = await response.json();

  return result.data;
};

// Comment for comparing of different promise methods async and .then
// export const getUserPosts = async(userId) => {
//   const response = await fetch(`${BASE_URL}/posts`);

//   if (!userId) {
//     return response.json()
//       .then(responseOfPostsObject => responseOfPostsObject.data);
//   }

//   return response.json()
//     .then(responseOfPostsObject => responseOfPostsObject.data)
//     .then(posts => posts.filter(
//       post => post.userId === userId,
//     ));
// };
