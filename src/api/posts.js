import { request } from './api';

const adress = '/posts';

export const getPosts = () => request(adress);

export const getUserPosts = userId => request(`${adress}?userId=${userId}`);

export const getPostDetails = postId => request(`${adress}/${postId}`);
