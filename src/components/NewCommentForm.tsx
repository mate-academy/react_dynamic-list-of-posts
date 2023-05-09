import React, { useState } from 'react';
import classNames from 'classnames';
import { CommentData } from '../types/Comment';
import { Errors } from '../types/Errors';

type Props = {
  newCommentsData: CommentData;
  setNewCommentsData: (data: CommentData) => void;
  addComment: () => void;
  isCommentAdding: boolean;
  typeOfError: Errors;
};

export const NewCommentForm: React.FC<Props> = ({
  newCommentsData,
  setNewCommentsData,
  addComment,
  isCommentAdding,
  typeOfError,
}) => {
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  const inputCommentsName = (event: React.FormEvent<HTMLInputElement>) => {
    const name = event.currentTarget.value;

    setNewCommentsData({ ...newCommentsData, name });
    setNameError(false);
  };

  const inputCommentsEmail = (event: React.FormEvent<HTMLInputElement>) => {
    const email = event.currentTarget.value;

    setNewCommentsData({ ...newCommentsData, email });
    setEmailError(false);
  };

  const inputCommentsBody = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const body = event.currentTarget.value;

    setNewCommentsData({ ...newCommentsData, body });
    setBodyError(false);
  };

  const handleAddClick = () => (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (newCommentsData.name !== ''
    && newCommentsData.email !== ''
    && newCommentsData.body !== '') {
      addComment();
      setNewCommentsData({ ...newCommentsData, body: '' });
    } else {
      if (newCommentsData.name === '') {
        setNameError(true);
      }

      if (newCommentsData.email === '') {
        setEmailError(true);
      }

      if (newCommentsData.body === '') {
        setBodyError(true);
      }
    }
  };

  const handleClearClick = () => {
    setNewCommentsData({
      ...newCommentsData,
      name: '',
      email: '',
      body: '',
    });

    setNameError(false);
    setEmailError(false);
    setBodyError(false);
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
            className={classNames(
              'input', { 'is-danger': nameError },
            )}
            value={newCommentsData.name}
            onChange={inputCommentsName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameError && (
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
              'input', { 'is-danger': emailError },
            )}
            value={newCommentsData.email}
            onChange={inputCommentsEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailError && (
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
              'textarea', { 'is-danger': bodyError },
            )}
            value={newCommentsData.body}
            onChange={inputCommentsBody}
          />
        </div>

        {bodyError && (
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
              'button',
              'is-link',
              { 'is-loading': isCommentAdding },
            )}
            onClick={handleAddClick()}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClearClick}
          >
            Clear
          </button>
        </div>
      </div>
      {typeOfError === Errors.Adding && (
        <p className="help is-danger" data-cy="ErrorMessage">
          {typeOfError[0].toUpperCase() + typeOfError.slice(1).toLowerCase()}
        </p>
      )}
    </form>
  );
};
