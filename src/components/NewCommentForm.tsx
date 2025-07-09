import { NameField } from './NameField';
import { EmailField } from './EmailField';
import { BodyField } from './BodyField';
import { FormGrouped } from './FormGrouped';
import { useState } from 'react';
import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';

interface NewCommentFormProps {
  handleAddComment: (
    comment: CommentData & { postId: number },
    onSuccess: () => void,
  ) => void;
  openedPost: Post;
  hasAddCommentLoader: boolean;
}

export const NewCommentForm: React.FC<NewCommentFormProps> = ({
  handleAddComment,
  openedPost,
  hasAddCommentLoader,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const [isNameError, setIsNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isBodyError, setIsBodyError] = useState(false);

  const handleClear = () => {
    setName('');
    setEmail('');
    setBody('');
    setIsNameError(false);
    setIsEmailError(false);
    setIsBodyError(false);
  };

  const handleNameChange = (value: string) => {
    setName(value);
    setIsNameError(false);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setIsEmailError(false);
  };

  const handleBodyChange = (value: string) => {
    setBody(value);
    setIsBodyError(false);
  };

  const handleCheckCompletedData = () => {
    if (!name.trim()) {
      setIsNameError(true);
    }

    if (!email.trim()) {
      setIsEmailError(true);
    }

    if (!body.trim()) {
      setIsBodyError(true);
    }

    if (!name.trim() || !email.trim() || !body.trim()) {
      return;
    }

    handleAddComment(
      {
        name,
        email,
        body,
        postId: openedPost.id,
      },
      () => {
        setBody('');
        setIsNameError(false);
        setIsEmailError(false);
        setIsBodyError(false);
      },
    );
  };

  return (
    <form data-cy="NewCommentForm">
      <NameField setName={handleNameChange} isNameError={isNameError} />

      <EmailField setEmail={handleEmailChange} isEmailError={isEmailError} />

      <BodyField
        setBody={handleBodyChange}
        isBodyError={isBodyError}
        body={body}
      />

      <FormGrouped
        handleCheckCompletedData={handleCheckCompletedData}
        hasAddCommentLoader={hasAddCommentLoader}
        handleClear={handleClear}
      />
    </form>
  );
};
