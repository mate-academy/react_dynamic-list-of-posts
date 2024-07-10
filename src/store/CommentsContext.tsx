import React, { useCallback, useMemo, useState } from 'react';
import { commentsService } from '../services/comment';
import { Comment } from '../types/Comment';
import { CommentsContextType } from '../types/ContextType';

export const CommentsContext = React.createContext<CommentsContextType>({
  comments: [] as Comment[],
  loading: false,
  errorMessage: '',
  loadComments: async () => {},
  deletedComment: async () => {},
  addComment: async () => {},
  addLoading: false,
  text: '',
  setText: () => {},
  openForm: false,
  setOpenForm: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const CommentsProvider: React.FC<Props> = ({ children }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [text, setText] = useState('');
  const [openForm, setOpenForm] = useState(false);

  const loadComments = useCallback(async (postId: number) => {
    setLoading(true);
    setErrorMessage('');

    try {
      const commentsFromService = await commentsService.get(postId);

      setComments(commentsFromService);
    } catch {
      setErrorMessage('Something went wrong!');
    } finally {
      setLoading(false);
    }
  }, []);

  const deletedComment = useCallback(async (commentId: number) => {
    setComments(currentComment =>
      currentComment.filter(comment => comment.id !== commentId),
    );

    await commentsService.delete(commentId);
  }, []);

  const addComment = useCallback(
    async ({ name, email, body, postId, id }: Comment) => {
      setErrorMessage('');
      setAddLoading(true);

      try {
        const newComment = await commentsService.create({
          name,
          email,
          body,
          postId,
          id,
        });

        setComments(currentComment => [...currentComment, newComment]);
      } catch {
        setErrorMessage('Something went wrong!');
      } finally {
        setText('');
        setAddLoading(false);
      }
    },
    [],
  );

  const value = useMemo(
    () => ({
      comments,
      loading,
      errorMessage,
      loadComments,
      deletedComment,
      addComment,
      addLoading,
      text,
      setText,
      openForm,
      setOpenForm,
    }),
    [
      addComment,
      addLoading,
      comments,
      deletedComment,
      errorMessage,
      loadComments,
      loading,
      openForm,
      text,
    ],
  );

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
};
