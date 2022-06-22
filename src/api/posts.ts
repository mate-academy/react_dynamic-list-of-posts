import { Comment, Post, NewComment } from '../react-app-env';

export const BASE_URL = 'https://mate.academy/students-api';

export const getUserPosts = (userId: string) => {
  if (userId === '0') {
    return fetch(`${BASE_URL}/posts/`)
      .then(response => response.json());
  }

  return fetch(`${BASE_URL}/posts/?userId=${userId}`)
    .then(response => response.json());
};

export const getPostDetails = async (postId: number): Promise<Post | null> => {
  return fetch(`${BASE_URL}/posts/${postId}`)
    .then(response => response.json())
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
};

export const getPostComments = async (
  postId: number,
): Promise<NewComment[]> => {
  const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  return response.json();
};

export const deleteComment = async (commentId: number) => {
  await fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' })
    .then(result => result.json());
};

export const addComment = async (obj: Comment) => {
  const response = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  return response.json();
};
