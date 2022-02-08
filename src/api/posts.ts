export const BASE_URL = 'https://mate.academy/students-api/posts/';

export async function getPosts(): Promise<Post[]> {
  const posts = await fetch(`${BASE_URL}`);

  return posts.json();
}

export async function getUserPosts(userId: number) {
  const userPosts = await getPosts();

  if (userId === 0) {
    return userPosts;
  }

  return userPosts.filter(post => post.userId === userId);
}

export async function getPostDetails(postId: number) {
  const post = await fetch(`${BASE_URL}${postId}`);

  return post.json();
}
