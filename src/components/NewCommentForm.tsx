import classNames from 'classnames';
import React, { useState } from 'react';
import { CommentData } from '../types/Comment';
import { ErrorType } from '../types/ErrorType';
import { ErrorMessage } from './ErrorMessage';

type Props = {
  onCommentAdd: (comment: CommentData) => Promise<void>;
  isSubmitting: boolean;
  onloading: (value: boolean) => void;
  errorType: ErrorType | null;
};

export const NewCommentForm: React.FC<Props> = ({
  onCommentAdd,
  isSubmitting,
  onloading,
  errorType,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isBodyValid, setIsBodyValid] = useState(true);

  const handleFormReset = () => {
    setName('');
    setEmail('');
    setBody('');
    setIsNameValid(true);
    setIsEmailValid(true);
    setIsBodyValid(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) {
      setIsNameValid(false);
    }

    if (!email) {
      setIsEmailValid(false);
    }

    if (!body) {
      setIsBodyValid(false);
    }

    if (!name || !email || !body) {
      return;
    }

    onloading(true);
    await onCommentAdd({ name, email, body });
    setBody('');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setIsNameValid(true);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsEmailValid(true);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
    setIsBodyValid(true);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
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
              'input',
              { 'is-danger': !isNameValid },
            )}
            value={name}
            onChange={handleNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!isNameValid && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!isNameValid && (
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
              'input',
              { 'is-danger': !isEmailValid },
            )}
            value={email}
            onChange={handleEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {!isEmailValid && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!isEmailValid && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
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
              'textarea',
              { 'is-danger': !isBodyValid },
            )}
            value={body}
            onChange={handleBodyChange}
          />
        </div>

        {!isBodyValid && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Comment is required
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
              'button',
              'is-link',
              { 'is-loading': isSubmitting },
            )}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleFormReset}
          >
            Clear
          </button>
        </div>
      </div>

      {errorType === ErrorType.COMMENT_POST
        && <ErrorMessage errorType={errorType} />}
    </form>
  );
};
