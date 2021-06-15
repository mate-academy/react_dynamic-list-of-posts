import { getData } from './api';

const url = 'posts';

export const getAllPosts = () => getData(url);

export const getUserPosts = userId => getData(`${url}?userId=${userId}`);

export const getPostById = postId => getData(`${url}/${postId}`);
