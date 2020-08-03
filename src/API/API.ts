export const postsUrl = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/posts.json';
export const usersUrl = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/users.json';
export const commentsUrl = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/comments.json';

export const getData = async <T>(url: string): Promise<T[]> => {
  const response = await fetch(url);
  const { data } = await response.json();

  return data;
};
