import { createContext, useMemo, useState } from 'react';
import { Comment } from '../types/Comment';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface Props {
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  commentsStatus: Status;
  setCommentsStatus: React.Dispatch<React.SetStateAction<Status>>;
}

export const CommentsContext = createContext<Props>({
  comments: [],
  setComments: () => {},
  commentsStatus: 'idle',
  setCommentsStatus: () => {},
});

export const CommentsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsStatus, setCommentsStatus] = useState<Status>('idle');

  const value = useMemo(
    () => ({
      comments,
      setComments,
      commentsStatus,
      setCommentsStatus,
    }),
    [comments, commentsStatus],
  );

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
};
