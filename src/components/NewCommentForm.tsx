import React, { useState } from 'react';
import { postComment } from '../utils/requests';
import { Comment } from '../types/Comment';
import { validateEmail } from '../utils/validateEmail';
import { NameField } from './formFields/NameField';
import { EmailField } from './formFields/EmailField';
import { CommentField } from './formFields/CommentField';
import { SubmitButton } from './formFields/SubmitButton';
import { Post } from '../types/Post';

type Props = {
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  setCommentsBeforeFilter: React.Dispatch<React.SetStateAction<Comment[]>>,
  setIsAddingError: React.Dispatch<React.SetStateAction<boolean>>,
  selectedPost: Post,
};

export const NewCommentForm: React.FC<Props> = ({
  setComments,
  setCommentsBeforeFilter,
  setIsAddingError,
  selectedPost,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [isOnSubmitLoading, setIsOnSubmitLoading] = useState(false);
  const [isNameEmptyError, setIsNameEmptyError] = useState(false);
  const [isEmailEmptyError, setIsEmailEmptyError] = useState(false);
  const [isCommentEmptyError, setIsCommentEmptyError] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const newComment = {
    postId: selectedPost.id,
    name,
    email,
    body: comment,
  };

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setComment('');
  };

  const checkIfError = (a: string, b: string, c: string) => {
    return a && b && c;
  };

  const setErrorIfEmpty = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (!value) {
      setter(true);
    }
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorIfEmpty(name, setIsNameEmptyError);
    setErrorIfEmpty(email, setIsEmailEmptyError);
    setErrorIfEmpty(comment, setIsCommentEmptyError);

    if (!validateEmail(email)) {
      setIsEmailValid(false);

      return;
    }

    if (checkIfError(name, email, comment)) {
      setIsOnSubmitLoading(true);

      try {
        const postedComment: Comment = await postComment(newComment);

        setComments((prev) => [...prev, postedComment]);
        setCommentsBeforeFilter(
          (prev) => [...prev, postedComment],
        );

        setIsOnSubmitLoading(false);
      } catch {
        setIsAddingError(true);
        setIsOnSubmitLoading(false);
      } finally {
        setComment('');
        setIsOnSubmitLoading(false);
      }
    }
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleOnSubmit}
    >
      <NameField
        isNameEmptyError={isNameEmptyError}
        setIsNameEmptyError={setIsNameEmptyError}
        name={name}
        setName={setName}
      />

      <EmailField
        isEmailValid={isEmailValid}
        setIsEmailValid={setIsEmailValid}
        setIsEmailEmptyError={setIsEmailEmptyError}
        setEmail={setEmail}
        isEmailEmptyError={isEmailEmptyError}
        email={email}
      />

      <CommentField
        isCommentEmptyError={isCommentEmptyError}
        comment={comment}
        setComment={setComment}
        setIsCommentEmptyError={setIsCommentEmptyError}
      />

      <div className="field is-grouped">
        <SubmitButton isOnSubmitLoading={isOnSubmitLoading} />

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleResetForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
