import React, { useState } from 'react';
import cn from 'classnames';
import { createComment } from '../api/comments.api';
import { Comment } from '../types/Comment';

interface Props {
  postId: number,
  setErrorMessage: (error: string) => void,
  setComments: (comment: Comment) => void,
}

export const NewCommentForm: React.FC<Props> = ({
  postId,
  setErrorMessage,
  setComments,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const hasNameError = hasError && !name.trim();
  const hasEmailError = hasError && !email.trim();
  const hasMessageError = hasError && !message.trim();

  function reset() {
    setName('');
    setEmail('');
    setMessage('');
    setHasError(false);
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const normalizedName = name.trim();
    const normalizedEmail = email.trim();
    const normalizedMessage = message.trim();

    if (!normalizedName || !normalizedEmail || !normalizedMessage) {
      setHasError(true);

      return;
    }

    const newComment = {
      id: 0,
      name: normalizedName,
      email: normalizedEmail,
      body: normalizedMessage,
      postId,
    };

    setLoading(true);

    createComment(newComment)
      .then((createdComment) => {
        setMessage('');
        setHasError(false);
        setComments(createdComment);
      })
      .catch(() => {
        setErrorMessage('Cannot create a new comment.');
        throw new Error('Cannot create a new comment.');
      })
      .finally(() => setLoading(false));
  }

  return (
    <form data-cy="NewCommentForm" onSubmit={onSubmit}>
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
            className={cn('input', {
              'is-danger': hasNameError,
            })}
            value={name}
            onChange={event => {
              setName(event.target.value);
              setHasError(false);
            }}
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

        {hasError && !name.trim() && (
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
            className={cn('input', {
              'is-danger': hasEmailError,
            })}
            value={email}
            onChange={event => {
              setEmail(event.target.value);
              setHasError(false);
            }}
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
            placeholder="Type comment here"
            className={cn('textarea', {
              'is-danger': hasMessageError,
            })}
            value={message}
            onChange={event => {
              setMessage(event.target.value);
              setHasError(false);
            }}
          />
        </div>

        {hasMessageError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button', 'is-link', {
              'is-loading': loading,
            })}
            disabled={loading}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={reset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
