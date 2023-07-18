import {
  createContext, useEffect, useMemo, useState,
} from 'react';
import { Comment, CommentData } from '../types/Comment';
import { usePostsContext } from '../hooks/usePostsContext';
import { client } from '../utils/fetchClient';
import { Error } from '../types/Error';

export interface ProvidedValue {
  comments: Comment[],
  isCommentsPending: boolean,
  isCommentsError: boolean,
  addingComment: boolean,
  handleDeleteComment: (commentId: number) => Promise<void>,
  handleAddComment: (data: CommentData) => Promise<void>,
}

type Props = {
  children: React.ReactNode,
};

export const CommentsContext = createContext({} as ProvidedValue);

export const CommentsContextProvider = ({ children }: Props) => {
  const { selectedPost } = usePostsContext();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsPending, setIsCommentsPending] = useState(false);
  const [isCommentsError, setIsCommentsError] = useState(false);
  const [addingComment, setAddingComment] = useState(false);

  const fetchPostComments = async () => {
    setIsCommentsPending(true);
    setIsCommentsError(false);
    if (selectedPost !== null) {
      try {
        const postComments = await client.get<Comment[] | Error>(`/comments?postId=${selectedPost.id}`);

        if ((postComments as Error).error) {
          setIsCommentsError(true);
        } else {
          setComments(postComments as Comment[]);
        }
      } catch (error) {
        setIsCommentsError(true);
      } finally {
        setIsCommentsPending(false);
      }
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      setComments((prevComments) => (
        prevComments.filter(({ id }) => id !== commentId)));
      const response = await client.delete(`/comments/${commentId}`) as Comment | Error;

      if ((response as Error).statusCode === 500) {
        setIsCommentsError(true);
        setComments(comments);
      }
    } catch (error) {
      setIsCommentsError(true);
    }
  };

  const handleAddComment = async (data: CommentData) => {
    setAddingComment(true);
    try {
      const newComment = {
        postId: selectedPost?.id,
        name: data.name,
        email: data.email,
        body: data.body,
      };

      const res = await client.post('/comments', newComment) as Comment | Error;

      if ((res as Error).error) {
        setIsCommentsError(true);
      } else {
        setComments(prev => ([
          ...prev,
          res as Comment,
        ]));
      }
    } catch (error) {
      setIsCommentsError(true);
    } finally {
      setAddingComment(false);
    }
  };

  useEffect(() => {
    fetchPostComments();
  }, [selectedPost]);

  const providedValue = useMemo(() => ({
    comments,
    isCommentsPending,
    isCommentsError,
    addingComment,
    handleDeleteComment,
    handleAddComment,
  }), [
    comments,
    isCommentsPending,
    isCommentsError,
    addingComment,
  ]);

  return (
    <CommentsContext.Provider value={providedValue}>
      {children}
    </CommentsContext.Provider>
  );
};
