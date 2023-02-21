import classNames from 'classnames';
import React, { useState } from 'react';
import { CommentData } from '../../types/Comment';

type Props = {
  onAddComment: (comment: CommentData) => void,
};

export const NewCommentForm: React.FC<Props> = ({ onAddComment }) => {
  const [name, setName] = useState('');
  const [isNameError, setIsNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);
  const [commentBody, setCommentBody] = useState('');
  const [isCommentBodyError, setIsCommentBodyError] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);

  const handleResetButton = () => {
    setName('');
    setEmail('');
    setCommentBody('');
    setIsNameError(false);
    setIsEmailError(false);
    setIsCommentBodyError(false);
  };

  const handleFormError = () => {
    if (name.trim().length === 0) {
      setIsNameError(true);
    }

    if (email.trim().length === 0) {
      setIsEmailError(true);
    }

    if (commentBody.trim().length === 0) {
      setIsCommentBodyError(true);
    }
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleFormError();

    if (name && email && commentBody) {
      try {
        setIsCommentLoading(true);
        await onAddComment({
          name,
          email,
          body: commentBody,
        });
      } catch {
        setIsError(true);
      } finally {
        setIsCommentLoading(false);
      }
    }

    setCommentBody('');
  };

  if (isError) {
    return (
      <div className="notification is-danger" data-cy="CommentsError">
        Something went wrong
      </div>
    );
  }

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleFormSubmit}
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
            className={classNames('input', { 'is-danger': isNameError })}
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setIsNameError(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isNameError && (
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
            className={classNames('input', { 'is-danger': isEmailError })}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setIsEmailError(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isEmailError && (
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
              { 'is-danger': isCommentBodyError },
            )}
            value={commentBody}
            onChange={(event) => {
              setCommentBody(event.target.value);
              setIsCommentBodyError(false);
            }}
          />
        </div>

        {isCommentBodyError && (
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
              'button is-link',
              { 'is-loading': isCommentLoading },
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
            onClick={handleResetButton}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
