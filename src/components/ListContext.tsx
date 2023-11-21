import React, { useState, useMemo } from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

const initialComments: Comment[] = [];

interface ListContextType {
  idUserActive: number,
  setIdUserActive: (idUserActive: number) => void,
  selectedPost : Post,
  setSelectedPost: (selectedPost: Post) => void,
  isCommentFormVisible: boolean,
  setIsCommentFormVisible: (isLoadingComments: boolean) => void,
  comments : Comment[],
  setComments: (comments: Comment[]) => void,
  isErrorComment: boolean,
  setIsErrorComment: (isErrorComment: boolean) => void,
}

export const ListContext = React.createContext<ListContextType>({
  idUserActive: -1,
  setIdUserActive: () => { },
  selectedPost: {
    id: -1,
    userId: -1,
    title: '',
    body: '',
  },
  setSelectedPost: () => { },
  isCommentFormVisible: false,
  setIsCommentFormVisible: () => { },
  comments: initialComments,
  setComments: () => { },
  isErrorComment: false,
  setIsErrorComment: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const ListProvider: React.FC<Props> = ({ children }) => {
  const [idUserActive, setIdUserActive] = useState(-1);
  const [selectedPost, setSelectedPost] = useState<Post>({
    id: -1,
    userId: -1,
    title: '',
    body: '',
  });
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [isErrorComment, setIsErrorComment] = useState(false);

  const value = useMemo(() => ({
    idUserActive,
    setIdUserActive,
    selectedPost,
    setSelectedPost,
    isCommentFormVisible,
    setIsCommentFormVisible,
    comments,
    setComments,
    isErrorComment,
    setIsErrorComment,
  }), [
    idUserActive,
    selectedPost,
    isCommentFormVisible,
    comments,
    isErrorComment,
  ]);

  return (
    <ListContext.Provider value={value}>
      {children}
    </ListContext.Provider>
  );
};
