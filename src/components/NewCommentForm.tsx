import classNames from 'classnames';
import React, { useState } from 'react';
import { createComment } from '../api/comment';
import { Comment } from '../types/Comment';

type Props = {
  postId: number;
  onAdd: (comment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, onAdd }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isNameError, setIsNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isBodyError, setIsBodyError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitError, setHasSubmitError] = useState(false);

  const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setName('');
    setEmail('');
    setBody('');
    setIsNameError(false);
    setIsEmailError(false);
    setIsBodyError(false);
    setHasSubmitError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedBody = body.trim();
    const nameInvalid = trimmedName.length === 0;
    const emailInvalid = trimmedEmail.length === 0;
    const bodyInvalid = trimmedBody.length === 0;

    setIsNameError(nameInvalid);
    setIsEmailError(emailInvalid);
    setIsBodyError(bodyInvalid);
    setHasSubmitError(false);

    if (nameInvalid || emailInvalid || bodyInvalid) {
      return;
    }

    setIsSubmitting(true);

    createComment({
      postId,
      name: trimmedName,
      email: trimmedEmail,
      body: trimmedBody,
    })
      .then(newComment => {
        onAdd(newComment);
        setBody('');
      })
      .catch(() => {
        setHasSubmitError(true);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div
          className={classNames('control has-icons-left', {
            'has-icons-right': isNameError,
          })}
        >
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': isNameError })}
            value={name}
            onChange={event => {
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

        <div
          className={classNames('control has-icons-left', {
            'has-icons-right': isEmailError,
          })}
        >
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': isEmailError })}
            value={email}
            onChange={event => {
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
            className={classNames('textarea', { 'is-danger': isBodyError })}
            value={body}
            onChange={event => {
              setBody(event.target.value);
              setIsBodyError(false);
            }}
          />
        </div>

        {isBodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      {hasSubmitError && (
        <div className="notification is-danger">Unable to add a comment</div>
      )}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': isSubmitting,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
