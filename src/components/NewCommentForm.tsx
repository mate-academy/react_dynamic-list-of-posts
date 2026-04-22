import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import classNames from 'classnames';

export const NewCommentFormComponent: React.FC<{
  onSubmit: (comment: Omit<Comment, 'id' | 'postId'>) => Promise<void>;
}> = ({ onSubmit }) => {
  const [nameField, setNameField] = useState('');
  const [emailField, setEmailField] = useState('');
  const [commentField, setCommentField] = useState('');

  const [isNameError, setIsNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isCommentError, setIsCommentError] = useState(false);

  const [isSending, setIsSending] = useState(false);

  const resetAll = () => {
    setNameField('');
    setEmailField('');
    setCommentField('');
    setIsNameError(false);
    setIsEmailError(false);
    setIsCommentError(false);
  };

  const resetNameField = () => {
    setCommentField('');
    setIsNameError(false);
    setIsEmailError(false);
    setIsCommentError(false);
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSending) {
      return;
    }

    const normaliseNameField = nameField.trim();
    const normaliseEmailField = emailField.trim();
    const normaliseCommentField = commentField.trim();

    setIsNameError(!normaliseNameField);
    setIsEmailError(!normaliseEmailField);
    setIsCommentError(!normaliseCommentField);

    if (!normaliseNameField || !normaliseEmailField || !normaliseCommentField) {
      return;
    }

    setIsSending(true);

    const newComment: Omit<Comment, 'id' | 'postId'> = {
      name: normaliseNameField,
      email: normaliseEmailField,
      body: normaliseCommentField,
    };

    onSubmit(newComment)
      .then(() => {
        resetNameField();
      })
      .finally(() => setIsSending(false));
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleOnSubmit}>
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
            value={nameField}
            onChange={event => {
              setIsNameError(false);
              setNameField(event.target.value);
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
            value={emailField}
            onChange={event => {
              setIsEmailError(false);
              setEmailField(event.target.value);
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
            className={classNames('textarea', { 'is-danger': isCommentError })}
            value={commentField}
            onChange={event => {
              setIsCommentError(false);
              setCommentField(event.target.value);
            }}
          />
        </div>
        {isCommentError && (
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
              'is-loading': isSending,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={() => resetAll()}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};

export const NewCommentForm = React.memo(NewCommentFormComponent);
