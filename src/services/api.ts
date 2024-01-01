import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsers = (
  setIsErrorShowing: (isShowing: boolean) => void,
  setUsersFromServer: (users: User[] | null) => void,
) => {
  setIsErrorShowing(false);

  return client.get<User[]>('/users')
    .then(setUsersFromServer)
    .catch(() => setIsErrorShowing(true));
};

export const getPosts = async (
  userId: number,
) => {
  try {
    return await client.get<Post[]>(`/posts?userId=${userId}`);
  } catch {
    throw new Error('Couldn\'t fetch posts');
  }
};

export const getComments = (
  postId: number,
  setCommentsOfPost: React.Dispatch<React.SetStateAction<Comment[] | null>>,
  setIsCommentsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsErrorShowing: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setCommentsOfPost(null);
  setIsCommentsLoading(true);
  setIsErrorShowing(false);

  return client
    .get<Comment[]>(`/comments?postId=${postId}`)
    .then(setCommentsOfPost)
    .catch(() => setIsErrorShowing(true))
    .finally(() => setIsCommentsLoading(false));
};

export const postComment = async (
  newComment: Omit<Comment, 'id'>,
) => {
  try {
    return await client.post<Comment>('/comments', newComment);
  } catch {
    throw new Error('Couldn\'t post a comment');
  }
};

export const deleteComment = async (
  commentId: number,
) => {
  try {
    return await client.delete(`/comments/${commentId}`);
  } catch {
    throw new Error('Couldn\'t delete comment');
  }
};
