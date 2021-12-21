import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

const BASE_URL = 'https://mate.academy/students-api';

type CommentInfo = Omit<Comment, 'id'>;

function getData<T>(url: string): Promise<T> {
  return fetch(`${BASE_URL}/${url}`)
    .then(response => response.json());
}

export const getAllPosts = async () => {
  const posts = await getData<Post[]>('posts');

  return posts;
};

export const getUserPosts = async (userId: number) => {
  const posts = await getAllPosts();

  if (userId === 0) {
    return posts;
  }

  return posts.filter((post => post.userId === userId));
};

export const getPostDetails = async (postId: number) => {
  const post = await getData<Post>(`posts/${postId}`);

  return post;
};

export const getPostComments = async (postId: number) => {
  const comments = await getData<Comment[]>('comments');

  return comments.filter((comment => comment.postId === postId));
};

export const addComment = async (comment: CommentInfo) => {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });
};

export const deleteComment = async (commentId: number) => {
  return fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' });
};
