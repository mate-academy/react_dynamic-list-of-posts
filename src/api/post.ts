const BASE_URL = 'https://mate.academy/students-api';

export const request = async (url: string, options = {}) => {
  const response = await fetch(`${BASE_URL}${url}`, options);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
};

export const getUserPosts = async (userId = 0): Promise<Post[]> => {
  let requestUrl = '/posts';

  if (userId > 0) {
    requestUrl += `?userId=${userId}`;
  }

  const posts = await request(requestUrl);

  return posts;
};

export async function getPostDetails(postId: number): Promise<Post> {
  const postDetails = await request(`/posts/${postId}`);

  return postDetails;
}

export async function getPostComments(postId: number): Promise<PostComment[]> {
  const comments = await request(`/comments?postId=${postId}`);

  return comments;
}

export async function getUsers(): Promise<User[]> {
  const users = await request('/users');

  return users;
}
