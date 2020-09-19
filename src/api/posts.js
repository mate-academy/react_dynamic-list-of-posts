import { BASE_URL } from './api';

export async function selectedPostId(userId) {
  const responce = await fetch(`${BASE_URL}/posts`);
  const result = await responce.json();
  const posts = await result.data;

  if (+userId === 0) {
    return posts;
  }

  const filterPostsByUserId = posts.filter(post => post.userId === +userId);

  return filterPostsByUserId;
}

export async function getPostDetails(postsId) {
  const responce = await fetch(`${BASE_URL}/posts/${postsId}`);
  const result = await responce.json();
  const post = await result.data;

  return post;
}
