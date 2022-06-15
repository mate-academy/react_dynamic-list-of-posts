export const BASE_URL = 'https://mate.academy/students-api';
// export const users = '/users';
// export const posts = '/posts';

export async function request(specify : string) {
  const result = await (await fetch(`${BASE_URL}/${specify}`)).json();

  return result;
}
