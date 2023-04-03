import { ChangeEvent, FormEvent, useState } from 'react';
import { CommentData } from '../types/Comment';

interface Options {
  onAddComment: (comment: CommentData) => void
}

export const useForm = (options: Options) => {
  const { onAddComment } = options;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [notValidEmail, setNotValidEmail] = useState(false);
  const [commentError, setCommentError] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      setNameError(true);
    }

    if (!email.trim()) {
      setEmailError(true);
    }

    if (!commentText.trim()) {
      setCommentError(true);
    }

    if (!emailRegex.test(email)) {
      setNotValidEmail(true);
    }

    const isError = (
      !name.trim()
      || !email.trim()
      || !commentText.trim()
      || !emailRegex.test(email)
    );

    if (isError) {
      return;
    }

    const newComment = {
      name,
      email,
      body: commentText,
    };

    onAddComment(newComment);
    setCommentText('');
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNameError(false);
    setName(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailError(false);
    setEmail(event.target.value);
    setNotValidEmail(false);
  };

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentError(false);
    setCommentText(event.target.value);
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setCommentText('');
    setCommentError(false);
    setEmailError(false);
    setNameError(false);
    setNotValidEmail(false);
  };

  return {
    name,
    email,
    commentText,
    nameError,
    emailError,
    commentError,
    notValidEmail,
    handleClear,
    handleSubmit,
    handleEmailChange,
    handleNameChange,
    handleTextChange,
  };
};
