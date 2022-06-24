import { Post } from '../react-app-env';

export const BASE_URL = 'https://mate.academy/students-api/';

export async function getPosts(userId: string): Promise<Post[]> {
  const response = await fetch(`${BASE_URL}/posts?userId=${userId}`);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
}

// eslint-disable-next-line max-len
export async function getComments(postId: number) {
  const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  // console.log(response.json())
  return response.json();
}

export async function delComment(id : number) {
  const result = await fetch(`${BASE_URL}/comments/${id}`, { method: 'DELETE' });

  return result;
}

export async function postComment(
  name : string,
  email : string,
  body : string,
  postId: number,
  createdAt: string,
  updatedAt: string,
) {
  await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
      createdAt,
      updatedAt,
    }),
  });
}

// export async function getUser(userId: number): Promise<User> {
//   const response = await fetch(`${BASE_URL}/users/${userId}`);

//   return response.json();
// }
