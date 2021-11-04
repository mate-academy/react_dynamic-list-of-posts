import Post from '../types/postType';
import { BASE_URL } from './api';

export const getUserPosts = (userID:string): Promise<Post[]> => {
  return fetch(`${BASE_URL}/posts?userId=${userID}`)
    .then(result => result.json());
};

export const getPostsDetails = (postID:number): Promise<Post> => {
  return fetch(`${BASE_URL}/posts/${postID.toString()}`)
    .then(result => result.json());
};
