import { BASE_URL } from './api';

export async function getPosts(): Promise<Post[]> {
  const posts = await fetch(`${BASE_URL}/posts/`);

  return posts.json();
}

export async function getUserPosts(userId: number) {
  const userPosts = await getPosts();

  if (userId === 0) {
    return userPosts;
  }

  return userPosts.filter(post => post.userId === userId);
}

export const getPostDetails = async (postId: number) => {
  const res = await fetch(`${BASE_URL}/posts/${postId}`);

  return res.json();
};
