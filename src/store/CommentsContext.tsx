import React, { useState } from 'react';
import { Comment, СommentID } from '../types/Comment';
import {
  addComment as addCommentOnServer,
  deleteComment as deleteCommentFromServer,
} from '../api/comments';

interface CommentsContextType {
  comments: Comment[],
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  addComment: ((newCommwnt: Omit<Comment, 'id'>) => Promise<void>) | null,
  deleteComment: ((id: СommentID) => Promise<void>) | null,
}

export const CommentsContext = React.createContext<CommentsContextType>({
  comments: [],
  setComments: () => {},
  addComment: null,
  deleteComment: null,
});

export const CommentsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const addComment = (newComment: Omit<Comment, 'id'>) => {
    return addCommentOnServer(newComment)
      .then((newCommentOnServer) => setComments(prevComments => [
        ...prevComments,
        newCommentOnServer,
      ]));
  };

  const deleteComment = (commentIdToDelete: СommentID) => {
    return deleteCommentFromServer(commentIdToDelete)
      .then(() => setComments(prevComments => prevComments.filter(comment => (
        comment.id !== commentIdToDelete
      ))));
  };

  const value: CommentsContextType = {
    comments,
    setComments,
    deleteComment,
    addComment,
  };

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
};
