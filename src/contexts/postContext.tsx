/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { deleteComment } from '../api/users';

type PostContextType = {
  currentPost: Post | null;
  setCurrentPost: (currentPost: Post) => void;
  activePostId: number;
  setactivePostId: (activeUser: number) => void;
  postComments: Comment[];
  setPostComments: (postComments: Comment[]) => void;
  isErrorCommentsShown: boolean;
  setIsErrorCommentsShown: (isErrorCommentsShown: boolean) => void;
  isCommentsLoaderShown: boolean;
  setIsCommentsLoaderShown: (isCommentsLoaderShown: boolean) => void;
  isFormOpened: boolean;
  setIsFormOpened: (isFormOpened: boolean) => void;
  handleDeleteCommentButton: (pressedComment: number) => void;
};

export const PostContext = React.createContext<PostContextType>({
  currentPost: null,
  setCurrentPost: () => {},
  activePostId: 0,
  setactivePostId: () => {},
  postComments: [],
  setPostComments: () => {},
  isErrorCommentsShown: false,
  setIsErrorCommentsShown: () => {},
  isCommentsLoaderShown: false,
  setIsCommentsLoaderShown: () => {},
  isFormOpened: false,
  setIsFormOpened: () => {},
  handleDeleteCommentButton: (_pressedComment: number) => {},
});

type Props = {
  children: React.ReactNode;
};

export const PostProvider: React.FC<Props> = ({ children }) => {
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [activePostId, setactivePostId] = useState(0);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [isErrorCommentsShown, setIsErrorCommentsShown] = useState(false);
  const [isCommentsLoaderShown, setIsCommentsLoaderShown] = useState(false);
  const [isFormOpened, setIsFormOpened] = useState(false);

  const handleDeleteCommentButton = (pressedComment: number) => {
    deleteComment(pressedComment).then(() =>
      setPostComments(prevComments =>
        prevComments.filter(comment => comment.id !== pressedComment),
      ),
    );
  };

  const value = useMemo(
    () => ({
      currentPost,
      setCurrentPost,
      activePostId,
      setactivePostId,
      postComments,
      setPostComments,
      isErrorCommentsShown,
      setIsErrorCommentsShown,
      isCommentsLoaderShown,
      setIsCommentsLoaderShown,
      isFormOpened,
      setIsFormOpened,
      handleDeleteCommentButton,
    }),
    [
      currentPost,
      activePostId,
      postComments,
      isErrorCommentsShown,
      isCommentsLoaderShown,
      isFormOpened,
    ],
  );

  return (
    <PostContext.Provider value={value}> {children} </PostContext.Provider>
  );
};
