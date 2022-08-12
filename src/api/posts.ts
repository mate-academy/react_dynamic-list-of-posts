const BASE_URL = 'https://mate.academy/students-api';

export const getPosts = async (postId?: number) => {
  const URL = postId
    ? `${BASE_URL}/posts/${postId}`
    : `${BASE_URL}/posts`;

  const res = await fetch(URL);

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  const result = await res.json();

  return result;
};
