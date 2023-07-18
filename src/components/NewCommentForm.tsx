import classNames from 'classnames';
import React, { useState } from 'react';
import { useCommentsContext } from '../hooks/useCommentsContext';

const initialDetails = {
  name: '',
  email: '',
  body: '',
};

export const NewCommentForm: React.FC = () => {
  const { addingComment, handleAddComment } = useCommentsContext();
  const [commentDetails, setCommentDetails] = useState(initialDetails);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  const handleResetForm = () => {
    setNameError(false);
    setEmailError(false);
    setBodyError(false);
    setCommentDetails(prev => ({
      ...prev,
      body: '',
    }));
  };

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();

    if (!commentDetails.name) {
      setNameError(true);
    }

    if (!commentDetails.email) {
      setEmailError(true);
    }

    if (!commentDetails.body) {
      setBodyError(true);
    }

    if (commentDetails.name
      && commentDetails.email
      && commentDetails.body
    ) {
      handleAddComment(commentDetails);
      handleResetForm();
    }
  };

  const handleDetailsChange = (fieldName: string, value: string) => {
    setCommentDetails(prev => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <form
      data-cy="NewCommentForm"
      onReset={handleResetForm}
      onSubmit={handleSubmitForm}
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
            className={classNames('input', {
              'is-danger': nameError,
            })}
            value={commentDetails.name}
            onChange={e => handleDetailsChange(e.target.name, e.target.value)}
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
            className={classNames('input', {
              'is-danger': emailError,
            })}
            value={commentDetails.email}
            onChange={e => handleDetailsChange(e.target.name, e.target.value)}
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
            className={classNames('textarea', {
              'is-danger': bodyError,
            })}
            value={commentDetails.body}
            onChange={e => handleDetailsChange(e.target.name, e.target.value)}
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
            className={classNames('button is-link', {
              'is-loading': addingComment,
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
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
