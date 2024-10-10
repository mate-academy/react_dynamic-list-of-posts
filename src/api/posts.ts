import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';
import { ApiPath, QueryParams } from '../enums/enums';

export const getPostsByUserId = (userId: number) => {
  return client.get<Post[]>(
    `${ApiPath.POSTS}?${QueryParams.USER_ID}=${userId}`,
  );
};
