export const URLPosts = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/posts.json';
export const URLUsers = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/users.json';
export const URLComments = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/comments.json';

export const fetchData = async <T>(url: string): Promise<T[]> => {
  const response = await fetch(url);
  const data = await response.json();

  return data;
};
