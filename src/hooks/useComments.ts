import React, { useEffect, useState } from 'react';
// eslint-disable-next-line prettier/prettier, max-len
import { addComment, deleteComment, getComments } from '../api/comments/commentsApi';
import { Comment } from '../types/interfaces';
import { ErrorMessages } from '../types/ErrorMessages';
import { InputForm, Post } from '../types/interfaces';

export const useComments = (
  selectedPost: Post | null,
  setCurrentError: React.Dispatch<React.SetStateAction<ErrorMessages | null>>,
  inputForm: InputForm,
  setInputForm: React.Dispatch<React.SetStateAction<InputForm>>,
) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState<boolean>(false);
  const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);

  useEffect(() => {
    if (!selectedPost) {
      return;
    }

    const loadComments = async () => {
      setIsLoadingComments(true);

      try {
        const comment = await getComments(selectedPost.id);

        setComments(comment);
      } catch (error) {
        setCurrentError(ErrorMessages.PostsLoadingError);
      } finally {
        setIsLoadingComments(false);
      }
    };

    loadComments();
  }, [selectedPost?.id]);

  const handleAddComment = async (
    setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setIsLoadingAdd(true);

    const newComment: Comment = {
      id: 0,
      postId: selectedPost?.id ?? null,
      name: inputForm.name,
      email: inputForm.email,
      body: inputForm.body,
    };

    try {
      const result: Comment = await addComment(newComment);

      setComments(prev => [...prev, result]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setIsLoadingAdd(false);
      setIsSubmitted(false);
      setInputForm({ ...inputForm, body: '' });
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      setComments(prev => prev.filter(comment => comment.id !== commentId));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return {
    comments,
    isLoadingComments,
    isLoadingAdd,
    handleAddComment,
    handleDeleteComment,
  };
};
