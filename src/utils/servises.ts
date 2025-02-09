import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from './fetchClient';

export enum CurError {
  DelComs = 'Unable to delete the comment',
  AddComs = 'Unable to add the comment',
  LoadPosts = 'Unable to load posts',
  LoadUsers = 'Unable to load Users',
  LoadComs = 'Unable to load comments',
  Empty = '',
}

export enum CurLoading {
  Empty = '',
  Posts = 'Loading posts',
  Users = 'Loading users',
  Comms = 'Loading comments',
  DelComs = 'Deletting a comment',
  AddComs = 'Adding a comment',
}

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getPostsById = (id: number) => {
  return client.get<Post[]>(`/posts?userId=${id}`);
};

export const getCommentsByPostId = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteComment = async (
  comId: number,
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  setLoading: React.Dispatch<React.SetStateAction<CurLoading>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<CurError | string>>,
) => {
  setLoading(CurLoading.DelComs);
  try {
    await client.delete(`/comments/${comId}`);
    setComments(latestComms => latestComms.filter(com => com.id !== comId));
  } catch (error) {
    setErrorMessage(CurError.DelComs);
  } finally {
    setLoading(CurLoading.Empty);
  }
};

export const clearComment = (
  setName: React.Dispatch<React.SetStateAction<string>>,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  setText: React.Dispatch<React.SetStateAction<string>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<CurError | string>>,
  setErrorName: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorEmail: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorText: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setName('');
  setEmail('');
  setText('');
  setErrorMessage(CurError.Empty);
  setErrorName(false);
  setErrorEmail(false);
  setErrorText(false);
};

export const addComment = async (
  activePost: Post | null,
  name: string,
  email: string,
  text: string,
  comments: Comment[],
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  setText: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<CurLoading>>,
  setNewComment: React.Dispatch<React.SetStateAction<CommentData | null>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<CurError | string>>,
) => {
  const id =
    comments.length === 0 ? 1 : Math.max(...comments.map(com => com.id)) + 1;

  const newComment: Comment = {
    id,
    postId: activePost!.id,
    name,
    email,
    body: text,
  };

  const commentData = {
    postId: newComment.postId,
    name: newComment.name,
    email: newComment.email,
    body: newComment.body,
  };

  setLoading(CurLoading.AddComs);

  try {
    await client.post(`/comments`, commentData);
    setComments(prev => [...prev, newComment]);
    setNewComment(commentData);
    setText('');
  } catch (error) {
    setErrorMessage(CurError.AddComs);
  } finally {
    setLoading(CurLoading.Empty);
  }
};

export const validateForm = (
  name: string,
  email: string,
  text: string,
  setLoading: React.Dispatch<React.SetStateAction<CurLoading>>,
  comments: Comment[],
  activePost: Post | null,
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  setText: React.Dispatch<React.SetStateAction<string>>,
  setErrorName: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorEmail: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorText: React.Dispatch<React.SetStateAction<boolean>>,
  setNewComment: React.Dispatch<React.SetStateAction<CommentData | null>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<CurError | string>>,
) => {
  if (!name) {
    setErrorName(true);
  }

  if (!email) {
    setErrorEmail(true);
  }

  if (!text) {
    setErrorText(true);
  }

  if (name && email && text) {
    addComment(
      activePost,
      name,
      email,
      text,
      comments,
      setComments,
      setText,
      setLoading,
      setNewComment,
      setErrorMessage,
    );
  } else {
    return;
  }
};
