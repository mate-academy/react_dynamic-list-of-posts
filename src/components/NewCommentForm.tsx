import classNames from 'classnames';
import React, { useState } from 'react';
import { CommentData } from '../types/Comment';

type Props = {
  onAddComment: (commentData: CommentData) => Promise<void>;
};

const EMAIL_REGEXP =
  // eslint-disable-next-line max-len
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

export const NewCommentForm: React.FC<Props> = ({ onAddComment }) => {
  // #region nameField
  const [name, setName] = useState('');
  const [hasNameError, setHasNameError] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasNameError(false);
    setName(event.target.value);
  };
  // #endregion

  // #region emailField
  const [email, setEmail] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailErrorMessage('');
    setEmail(event.target.value);
  };
  // #endregion

  // #region bodyField
  const [body, setBody] = useState('');
  const [hasBodyError, setHasBodyError] = useState(false);

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHasBodyError(false);
    setBody(event.target.value);
  };
  // #endregion

  const [isLoading, setIsLoading] = useState(false);

  const handleAddNewComment = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!name) {
      setHasNameError(true);
    }

    if (!email) {
      setEmailErrorMessage('Email is required');
    } else if (!EMAIL_REGEXP.test(email)) {
      setEmailErrorMessage('Email is not valid');
    }

    if (body.trim().length === 0) {
      setHasBodyError(true);
    }

    if (
      !name ||
      !email ||
      !EMAIL_REGEXP.test(email) ||
      body.trim().length === 0
    ) {
      return;
    }

    setIsLoading(true);

    onAddComment({ name, email, body })
      .then(() => {
        setBody('');
      })
      .finally(() => setIsLoading(false));
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setBody('');
    setHasNameError(false);
    setEmailErrorMessage('');
    setHasBodyError(false);
  };

  return (
    <form data-cy="NewCommentForm">
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
            className={classNames('input', { 'is-danger': hasNameError })}
            value={name}
            onChange={handleNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasNameError && (
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
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': emailErrorMessage })}
            value={email}
            onChange={handleEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailErrorMessage && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailErrorMessage && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {emailErrorMessage}
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
            className={classNames('textarea', { 'is-danger': hasBodyError })}
            value={body}
            onChange={handleBodyChange}
          />
        </div>

        {hasBodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': isLoading,
            })}
            onClick={handleAddNewComment}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
