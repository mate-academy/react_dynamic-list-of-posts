import React, { useState } from 'react';
import { postComment } from '../utils/requests';
import { Comment } from '../types/Comment';
import { validateEmail } from '../utils/validateEmail';
import { NameField } from './formFields/NameField';
import { EmailField } from './formFields/EmailField';
import { CommentField } from './formFields/CommentField';
import { SubmitButton } from './formFields/SubmitButton';

type Props = {
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
};

export const NewCommentForm: React.FC<Props> = ({ setComments }) => {
  const [inputNameValue, setInputNameValue] = useState('');
  const [inputEmailValue, setInputEmailValue] = useState('');
  const [inputCommentValue, setInputCommentValue] = useState('');
  const [isOnSubmitLoading, setIsOnSubmitLoading] = useState(false);
  const [isNameEmptyError, setIsNameEmptyError] = useState(false);
  const [isEmailEmptyError, setIsEmailEmptyError] = useState(false);
  const [isCommentEmptyError, setIsCommentEmptyError] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const newComment = {
    id: +new Date(),
    postId: +new Date(),
    name: inputNameValue,
    email: inputEmailValue,
    body: inputCommentValue,
  };

  const handleResetForm = () => {
    setInputNameValue('');
    setInputEmailValue('');
    setInputCommentValue('');
  };

  const checkIsError = (a: string, b: string, c: string) => {
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

    setErrorIfEmpty(inputNameValue, setIsNameEmptyError);
    setErrorIfEmpty(inputEmailValue, setIsEmailEmptyError);
    setErrorIfEmpty(inputCommentValue, setIsCommentEmptyError);

    if (!validateEmail(inputEmailValue)) {
      setIsEmailValid(false);

      return;
    }

    if (checkIsError(inputNameValue, inputEmailValue, inputCommentValue)) {
      setIsOnSubmitLoading(true);

      try {
        await postComment(newComment);
        setComments((prev: Comment[]): Comment[] => [...prev, newComment]);

        setIsOnSubmitLoading(false);
      } catch {
        setIsOnSubmitLoading(false);
      } finally {
        setInputCommentValue('');
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
        inputNameValue={inputNameValue}
        setInputNameValue={setInputNameValue}
      />

      <EmailField
        isEmailValid={isEmailValid}
        setIsEmailValid={setIsEmailValid}
        setIsEmailEmptyError={setIsEmailEmptyError}
        setInputEmailValue={setInputEmailValue}
        isEmailEmptyError={isEmailEmptyError}
        inputEmailValue={inputEmailValue}
      />

      <CommentField
        isCommentEmptyError={isCommentEmptyError}
        inputCommentValue={inputCommentValue}
        setInputCommentValue={setInputCommentValue}
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
