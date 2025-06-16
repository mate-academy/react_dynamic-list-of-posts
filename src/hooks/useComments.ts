import { useEffect, useState } from 'react';
import * as ClientAPI from '../api/clientApi';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

export const useComments = (selectedPost: Post | null) => {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [isCommentsError, setIsCommentsError] = useState(false);

  const [isNewCommentFormVisible, setIsNewCommentFormVisible] = useState(false);

  const isEmpty = comments && !comments.length;
  const isComments = comments && !!comments.length;
  const isButtonShown = comments && !isNewCommentFormVisible;

  useEffect(() => {
    if (selectedPost === null) {
      return;
    }

    setIsCommentsError(false);
    setIsCommentsLoading(true);
    setComments(null);
    ClientAPI.getComments(selectedPost.id)
      .then(setComments)
      .catch(() => {
        setIsCommentsError(true);
      })
      .finally(() => {
        setIsNewCommentFormVisible(false);
        setIsCommentsLoading(false);
      });
  }, [selectedPost]);

  const deleteComment = async (commentId: number) => {
    if (comments === null) {
      return;
    }

    setComments(comments.filter(comment => comment.id !== commentId));
    try {
      await ClientAPI.deleteComment(commentId);
    } catch {
      setIsCommentsError(true);
    }
  };

  const addComment = (
    postId: number,
    { name, email, body }: Omit<Comment, 'id' | 'postId'>,
  ) => {
    if (comments === null) {
      return;
    }

    const newComment = {
      name: name,
      email: email,
      body: body,
      postId: postId,
    };

    setIsCommentsLoading(true);

    ClientAPI.addComment(postId, newComment)
      .then(comment => {
        setComments([...comments, comment]);
      })
      .catch(() => {
        setIsCommentsError(true);
      })
      .finally(() => {
        setIsCommentsLoading(false);
      });
  };

  return {
    comments,
    isCommentsLoading,
    isCommentsError,
    isEmpty,
    isComments,
    isButtonShown,
    isNewCommentFormVisible,
    setIsNewCommentFormVisible,
    deleteComment,
    addComment,
  };
};
