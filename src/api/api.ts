export const BASE_URL = 'https://mate.academy/students-api';

const request = (url: string) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => response.json());
};

export function getUserPosts(userId: string): Promise<Post[]> {
  return request(`/posts?userId=${userId}`);
}

export function getAllUsersPosts(): Promise<Post[]> {
  return request('/posts');
}

export function getUserComments(): Promise<PostComment[]> {
  return request('/comments');
}
