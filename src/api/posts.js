import { request } from './api';

const apiSection = '/posts/';

export async function getUserPosts(userId) {
  const usersPosts = await request(apiSection, { method: 'GET' });

  return usersPosts;
}

export async function getPostDetails(postId) {
  const postDetails = await request(
    `${apiSection}${postId}`, { method: 'GET' },
  );

  if (!postId) {
    return null;
  }

  return postDetails;
}
