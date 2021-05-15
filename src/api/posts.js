import { BASE_URL, request } from './api';

// export const getUserPosts = async(userId) => {
//   const response = await fetch(`${BASE_URL}posts/${userId}`);

//   return response.json();
// };

// export const getUserComments = async(userId) => {
//   const response = await fetch(`${BASE_URL}comments/${userId}`);

//   return response.json();
// };

export function getUsers() {
  return request(`${BASE_URL}/users`)
  // return request(`${BASE_URL}/users`)
  //   .then(users => users.filter(
  //     (elem, i, self) => i === 0 || (elem.name !== self[i - 1].name),
  //   ));
}

export function getPosts() {
  return request(`${BASE_URL}/posts`);
}

export function getUserPosts(userId) {
  return getPosts()
    .then(posts => posts.filter(post => (
      post.userId === userId
    )));
}

export function getPostDetails(postId) {
  return request(`${BASE_URL}/posts/${postId}`);
}
