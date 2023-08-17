import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import { User } from '../types/User';

export const BASE_URL = 'https://mate.academy/students-api';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

async function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  await wait(300);
  const response = await fetch(BASE_URL + url, options);

  if (!response.ok) {
    throw new Error('Network response was not ok.');
  }

  return response.json();
}

const USERS_ENDPOINT = '/users';
const POSTS_ENDPOINT = '/posts';
const COMMENTS_ENDPOINT = '/comments';

export const getUsers = async (): Promise<User[]> => {
  return request<User[]>(USERS_ENDPOINT);
};

export const getPosts = async (userId: number): Promise<Post[]> => {
  return request<Post[]>(`${POSTS_ENDPOINT}?userId=${userId}`);
};

export const getComments = async (postId: number): Promise<Comment[]> => {
  return request<Comment[]>(`${COMMENTS_ENDPOINT}?postId=${postId}`);
};

export const deleteComment = async (commentId: number): Promise<void> => {
  await request<void>(`${COMMENTS_ENDPOINT}/${commentId}`, 'DELETE');
};

export const addComment = async (comment: CommentData): Promise<Comment> => {
  return request<Comment>(COMMENTS_ENDPOINT, 'POST', comment);
};
