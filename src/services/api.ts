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

export const getPosts = (
  userId: number,
  setIsErrorShowing: (isShowing: boolean) => void,
  setPostsFromServer: (posts: Post[] | null) => void,
) => {
  setPostsFromServer(null);
  setIsErrorShowing(false);

  return client.get<Post[]>(`/posts?userId=${userId}`)
    .then(setPostsFromServer)
    .catch(() => setIsErrorShowing(true));
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
