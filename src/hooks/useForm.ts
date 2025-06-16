import { useState } from 'react';
import { Comment } from '../types/Comment';

export const useForm = (
  postId: number | undefined,
  onCommentAdd?: (
    postId: number,
    { name, email, body }: Omit<Comment, 'id' | 'postId'>,
  ) => void,
) => {
  const [authorName, setAuthorName] = useState('');
  const [isAuthorNameError, setIsAuthorNameError] = useState(false);

  const [authorEmail, setAuthorEmail] = useState('');
  const [isAuthorEmailError, setIsAuthorEmailError] = useState(false);

  const [commentBody, setCommentBody] = useState('');
  const [isCommentBodyError, setIsCommentBodyError] = useState(false);

  const handleAuthorNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsAuthorNameError(false);
    setAuthorName(event.target.value);
  };

  const handleAuthorEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsAuthorEmailError(false);
    setAuthorEmail(event.target.value);
  };

  const handleCommentBodyChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setIsCommentBodyError(false);
    setCommentBody(event.target.value);
  };

  const handleReset = () => {
    setAuthorName('');
    setIsAuthorNameError(false);
    setAuthorEmail('');
    setIsAuthorEmailError(false);
    setCommentBody('');
    setIsCommentBodyError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isNameValid = !!authorName.trim();
    const isEmailValid = !!authorEmail.trim();
    const isBodyValid = !!commentBody.trim();

    setIsAuthorNameError(!isNameValid);
    setIsAuthorEmailError(!isEmailValid);
    setIsCommentBodyError(!isBodyValid);

    if (!isNameValid || !isEmailValid || !isBodyValid) {
      return;
    }

    if (postId !== undefined) {
      onCommentAdd?.(postId, {
        name: authorName,
        email: authorEmail,
        body: commentBody,
      });

      setIsAuthorNameError(false);
      setIsAuthorEmailError(false);
      setCommentBody('');
      setIsCommentBodyError(false);
    }
  };

  return {
    authorName,
    isAuthorNameError,
    authorEmail,
    isAuthorEmailError,
    commentBody,
    isCommentBodyError,
    handleAuthorNameChange,
    handleAuthorEmailChange,
    handleCommentBodyChange,
    handleReset,
    handleSubmit,
  };
};
