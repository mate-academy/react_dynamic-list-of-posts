import { BASE_URL, request } from './api';

const POST_URL = `${BASE_URL}/posts`;

export const getAllPosts = () => request(POST_URL);

export const getUserPosts = (userId: number) => request(`${POST_URL}?userId=${userId}`);
