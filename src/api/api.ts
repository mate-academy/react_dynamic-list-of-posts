export const BASE_URL = 'https://mate.academy/students-api';

export async function request(specify : string) { // body of main request from server
  const result = await fetch(`${BASE_URL}/${specify}`);

  return result.json();
}

export function deleteRequest(specify : string) : Promise<Response> { // body of main request to delete on server
  const result = fetch(`${BASE_URL}/${specify}`, { method: 'DELETE' });

  return result;
}

export async function getPostComments(postId : number) {
  const result = await request(`comments?postId=${postId}`);

  return result;
}
