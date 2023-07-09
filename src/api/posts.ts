import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getPostsFromServer = (userID: number) => client.get<Post[]>(`/posts?userId=${userID}`);
