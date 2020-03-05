const API_URL = 'https://jsonplaceholder.typicode.com/';

export const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  return response.json();
};

export const getPosts = (): Promise<Posts> => {
  return getData(`${API_URL}posts`);
};

export const getUsers = (): Promise<Users> => {
  return getData(`${API_URL}users`);
};

export const getComments = (): Promise<Comments> => {
  return getData(`${API_URL}comments`);
};
