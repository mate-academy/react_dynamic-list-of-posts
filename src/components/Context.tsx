import React, { useState, ReactNode } from 'react';

import { Comment } from '../types/Comment';

type ContextValue = {
  commentList: Comment[] | undefined
  setCommentList: React.Dispatch<React.SetStateAction<Comment[] | undefined>>

  commentListError: boolean
  setCommentListError: React.Dispatch<React.SetStateAction<boolean>>
};

export const Context = React.createContext<ContextValue>({
  commentList: undefined,
  setCommentList: () => {},

  commentListError: false,
  setCommentListError: () => {},
});

type Props = {
  children: ReactNode
};

export const CommentsProvider: React.FC<Props> = ({ children }) => {
  // eslint-disable-next-line max-len
  const [commentList, setCommentList] = useState<Comment[] | undefined>(undefined);
  const [commentListError, setCommentListError] = useState<boolean>(false);

  const contextValue:ContextValue = {
    commentList,
    setCommentList,

    commentListError,
    setCommentListError,
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};
