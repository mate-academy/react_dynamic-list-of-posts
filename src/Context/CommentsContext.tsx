import React, { useContext, useState } from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { CurrentPostContext } from './CurrentPostContext';
import { CurrentUserContext } from './CurrentUserContext';
import { SidebarContext } from './SidebarContext';
import * as commentsApiServise from '../api/CommentApi';
import { NotificationContent } from './NotificationManager';

type CommentsContextProps = {
  commentList: Comment[];
  setCommentList: React.Dispatch<React.SetStateAction<Comment[]>>;
  commentLoader: boolean;
  setCommentLoader: React.Dispatch<React.SetStateAction<boolean>>;
  onCommentsList: (postItem: Post) => void;
  onSubmitComment: (comment: Comment) => void;
  onDeleteComment: (commentId: number) => void;
};

export const CommentsContext = React.createContext<CommentsContextProps>({
  commentList: [],
  setCommentList: () => {},
  commentLoader: false,
  setCommentLoader: () => {},
  onCommentsList: () => {},
  onSubmitComment: () => {},
  onDeleteComment: () => {},
});

type CommentsProviderProps = {
  children: React.ReactNode;
};

export const CommentsProvider: React.FC<CommentsProviderProps> = ({
  children,
}) => {
  const { setSelectedPost } = useContext(CurrentPostContext);
  const { selectedUser } = useContext(CurrentUserContext);
  const { setSidebar } = useContext(SidebarContext);
  const { notificationDispatch } = useContext(NotificationContent);

  const [commentLoader, setCommentLoader] = useState(false);
  const [commentList, setCommentList] = useState<Comment[]>([]);

  const onCommentsList = async (postItem: Post) => {
    setSelectedPost(postItem);
    setCommentList([]);
    setSidebar(true);

    notificationDispatch({
      type: 'SET_CLEAR',
      source: 'PostDetails',
    });

    try {
      setCommentLoader(true);

      const comments = await commentsApiServise.getComments(postItem.id);

      if (comments.length === 0) {
        notificationDispatch({
          type: 'SET_ALARM',
          error: '',
          alarm: 'No comments yet',
          source: 'PostDetails',
        });
      }

      setCommentList(comments);
    } catch {
      setCommentLoader(false);
      notificationDispatch({
        type: 'SET_ERROR',
        error: 'Something went wrong',
        alarm: '',
        source: 'PostDetails',
      });
    } finally {
      setCommentLoader(false);
    }
  };

  const onSubmitComment = (comment: Comment) => {
    if (selectedUser !== null) {
      setCommentList(prev => [...prev, comment]);
    }
  };

  const onDeleteComment = (commentId: number) => {
    const index: number = commentList.findIndex(
      comment => comment.id === commentId,
    );
    const newCommentList = [...commentList];

    newCommentList.splice(index, 1);

    if (newCommentList.length === 0) {
      notificationDispatch({
        type: 'SET_ALARM',
        error: '',
        alarm: 'No comments yet',
        source: 'PostDetails',
      });
    }

    setCommentList(newCommentList);
  };

  return (
    <CommentsContext.Provider
      value={{
        commentList,
        setCommentList,
        commentLoader,
        setCommentLoader,
        onCommentsList,
        onSubmitComment,
        onDeleteComment,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};
