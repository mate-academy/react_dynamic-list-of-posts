const URL_TEMPLATE = 'https://jsonplaceholder.typicode.com/';

const getData = <T>(url: string): Promise<T[]> => (
  fetch(URL_TEMPLATE + url).then(response => response.json())
);

export const getPosts = () => getData<Post>('posts');
export const getUsers = () => getData<User>('users');
export const getComments = () => getData<Comment>('comments');
