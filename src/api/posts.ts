import { BASE_URL } from './api';

const wait = (delay: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
};

export const getUserPosts = async (userId: string) => {
  await wait(750);
  const response = await fetch(`${BASE_URL}/posts/${userId}`);

  return response.json();
};
