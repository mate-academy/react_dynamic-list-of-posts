import { BASE_URL } from './api';

export async function getUserPosts(userId: number) {
  try {
    const response = await fetch(`${BASE_URL}/posts${userId === 0 ? '' : `?userId=${userId}`}`);

    if (!response.ok) {
      throw Error(response.statusText);
    }

    const posts = await response.json();

    return posts;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }

  return null;
}
