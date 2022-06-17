import { forComment, Post } from '../react-app-env';

const API_POSTS = 'https://mate.academy/students-api/posts';
const API_POST_ID = 'https://mate.academy/students-api/comments';

export const getPosts = async (id = 0): Promise<Post[]> => {
  let response;

  if (id === 0) {
    response = await fetch(API_POSTS);
  } else {
    response = await fetch(`${API_POSTS}?userId=${id}`);
  }

  return response.json();
};

export const getComment = async (id: number): Promise<forComment[]> => {
  const response = await fetch(`${API_POST_ID}?postId=${id}`);

  return response.json();
};

export const getPostId = async (id: number): Promise<Post> => {
  const response = await fetch(`${API_POSTS}/${id}`);

  return response.json();
};
