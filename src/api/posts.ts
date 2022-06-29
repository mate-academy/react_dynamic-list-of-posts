import { request } from './api';

export async function getUserPosts(userId : number) {
  let result;

  if (userId === 0) {
    result = await request('posts');

    return result;
  }

  result = await request(`/posts?userId=${userId}`);

  return result.json();
}

export async function getPostDetails(postId : number) {
  const result = await request(`/posts/${postId}`);

  return result;
}
