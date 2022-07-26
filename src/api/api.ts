import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

export const BASE_URL = 'https://mate.academy/students-api';

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function get<T>(url: string): Promise<T> {
  return wait(1000)
    .then(() => fetch(BASE_URL + url))
    .then(res => res.json());
}

function remove<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url, { method: 'DELETE' })
    .then(res => res.json());
}

export const getUserPosts = (userId:number): Promise<Post[]> => {
  return get(`/posts/?userId=${userId}`);
};

export const getAllPosts = (): Promise<Post[]> => {
  return get('/posts/');
};

export const getPostDetails = (postId: number | null): Promise<Post> => {
  return get(`/posts/${postId}`);
};

export const getPostComments = (postId: number | null): Promise<Comment[]> => {
  return get(`/comments?postId=${postId}`);
};

export const deletePostComment = (
  commentId: number | undefined,
): Promise<Comment> => {
  return remove(`/comments/${commentId}`);
};

export function postComment(newPost: Comment) {
  return fetch(`${BASE_URL}/comments`,
    {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(newPost),
    }).then(res => res.json());
}
