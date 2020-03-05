import { URL_COMMENTS, URL_POSTS, URL_USERS } from './constants';

async function getData <T>(url: string): Promise<T> {
  const response = await fetch(url);

  return response.json();
}

export const getPosts = (): Promise<PostInterface[]> => {
  return getData(URL_POSTS);
};

export const getComments = (): Promise<CommentInterface[]> => {
  return getData(URL_COMMENTS);
};

export const getUsers = (): Promise<UserInterface[]> => {
  return getData(URL_USERS);
};
