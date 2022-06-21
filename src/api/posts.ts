import { BASE_URL, request } from './api';

export async function getUserPosts(userId : string) {
  let result;

  if (Number(userId) === 0) {
    result = await (await request('posts'));
  } else {
    result = await (await fetch(`${BASE_URL}/posts?userId=${userId}`)).json();
  }

  return result;
}

export async function getPostDetails(postId : number) {
  const result = await fetch(`${BASE_URL}/posts/:${postId}`);

  return result;
}
