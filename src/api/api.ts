import Post from '../types/postType';

export const BASE_URL = 'https://mate.academy/students-api';

const getAllUserPosts = (): Promise<Post[]> => {
  return fetch(`${BASE_URL}/posts`)
    .then(result => result.json());
};

export default getAllUserPosts;
