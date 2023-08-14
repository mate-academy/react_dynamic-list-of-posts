import classNames from 'classnames';
import React, { useState } from 'react';
import { ErrMessage } from '../types/ErrMessage';

type Props = {
  name: string,
  onSetFormName: (name: string) => void,
  email: string,
  onSetFormEmail: (email: string) => void,
  commentText: string,
  onSetCommentText: (commentText: string) => void,
  addComment: (name: string, email: string, text: string) => void,
  isLoadingNewComment: boolean,
  onSetErrorInPostDetails: (errorMessage: ErrMessage) => void,
};

export const NewCommentForm: React.FC<Props> = ({
  name,
  onSetFormName,
  email,
  onSetFormEmail,
  commentText,
  onSetCommentText,
  addComment,
  isLoadingNewComment,
  onSetErrorInPostDetails,
}) => {
  const [isErrorName, setIsErrorName] = useState<boolean>(false);
  const [isErrorEmail, setIsErrorEmail] = useState<boolean>(false);
  const [isErrorCommentText, setIsErrorCommentText] = useState<boolean>(false);

  const handlerInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;

    onSetFormName(newName);
    setIsErrorName(false);
    onSetErrorInPostDetails(ErrMessage.Empty);
  };

  const handlerInputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;

    onSetFormEmail(newEmail);
    setIsErrorEmail(false);
    onSetErrorInPostDetails(ErrMessage.Empty);
  };

  const handlerChangeTextarea = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const newText = event.target.value;

    onSetCommentText(newText);
    setIsErrorCommentText(false);
    onSetErrorInPostDetails(ErrMessage.Empty);
  };

  const handlerSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onSetErrorInPostDetails(ErrMessage.Empty);

    const trimedName = name.trim();
    const trimedEmail = email.trim();
    const trimedCommentText = commentText.trim();

    if (trimedName.length < 1
      || trimedEmail.length < 1
      || trimedCommentText.length < 1) {
      if (trimedName.length < 1) {
        setIsErrorName(true);
        onSetFormName('');
      }

      if (trimedEmail.length < 1) {
        setIsErrorEmail(true);
        onSetFormEmail('');
      }

      if (trimedCommentText.length < 1) {
        setIsErrorCommentText(true);
        onSetCommentText('');
      }

      return;
    }

    addComment(trimedName, trimedEmail, trimedCommentText);
  };

  const handlerReset = () => {
    onSetFormName('');
    onSetFormEmail('');
    onSetCommentText('');

    setIsErrorName(false);
    setIsErrorEmail(false);
    setIsErrorCommentText(false);
    onSetErrorInPostDetails(ErrMessage.Empty);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handlerSubmit}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames(
              'input', { 'is-danger': isErrorName },
            )}
            value={name}
            onChange={handlerInputName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isErrorName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isErrorName && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames(
              'input', { 'is-danger': isErrorEmail },
            )}
            value={email}
            onChange={handlerInputEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isErrorEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isErrorEmail && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames(
              'textarea', { 'is-danger': isErrorCommentText },
            )}
            value={commentText}
            onChange={handlerChangeTextarea}
          />
        </div>

        {isErrorCommentText && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
              'button', 'is-link', { 'is-loading': isLoadingNewComment },
            )}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="button"
            className={classNames(
              'button', 'is-link', 'is-light',
            )}
            disabled={isLoadingNewComment}
            onClick={handlerReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
