import cn from 'classnames';
import React, { FormEvent, useState } from 'react';
import { CommentData } from '../types/Comment';

type Props = {
  onAddComment: (comment: CommentData) => Promise<void>,
};

export const NewCommentForm: React.FC<Props> = ({
  onAddComment,
}) => {
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputBody, setInputBody] = useState('');
  const [hasNameError, setHasNameError] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasCommentError, setHasCommentError] = useState(false);
  const [hasCommentLoading, setHasCommentLoading] = useState(false);

  const handleFormError = () => {
    setHasNameError(!inputName);
    setHasEmailError(!inputEmail);
    setHasCommentError(!inputBody);
  };

  const resetFormError = () => {
    setHasNameError(false);
    setHasEmailError(false);
    setHasCommentError(false);
  };

  const resetForm = () => {
    resetFormError();
    setInputName('');
    setInputEmail('');
    setInputBody('');
  };

  const resetOnSuccessSubmit = () => {
    setInputBody('');
    resetFormError();
  };

  const handleAddComment = async (event: FormEvent) => {
    event.preventDefault();

    handleFormError();

    if (inputName && inputEmail && inputBody) {
      try {
        setHasCommentLoading(true);
        await onAddComment({
          name: inputName,
          email: inputEmail,
          body: inputBody,
        });
        resetOnSuccessSubmit();
      } finally {
        setHasCommentLoading(false);
      }
    }
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleAddComment}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            value={inputName}
            onChange={event => {
              setInputName(event.target.value);
              setHasNameError(false);
            }}
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', {
              'is-danger': hasNameError,
            })}
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
            type="text"
            name="email"
            value={inputEmail}
            onChange={event => {
              setInputEmail(event.target.value);
              setHasEmailError(false);
            }}
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', {
              'is-danger': hasEmailError,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasEmailError && (
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
            value={inputBody}
            onChange={event => {
              setInputBody(event.target.value);
              setHasCommentError(false);
            }}
            placeholder="Type comment here"
            className={cn('textarea', {
              'is-danger': hasCommentError,
            })}
          />
        </div>

        {hasCommentError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            // is-loading
            className={cn('button is-link', {
              'is-loading': hasCommentLoading,
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
            onClick={resetForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
