import React, { useState } from 'react';
import cn from 'classnames';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  onAddComment: (newComment: Comment) => void;
  postId: number;
};

export const NewCommentForm: React.FC<Props> = ({ onAddComment, postId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitError, setHasSubmitError] = useState(false);

  const hasNameError = isSubmitted && name.trim() === '';

  const hasEmailError = isSubmitted && email.trim() === '';

  const hasBodyError = isSubmitted && body.trim() === '';

  function handleClear() {
    setName('');
    setEmail('');
    setBody('');
    setIsSubmitted(false);
    setHasSubmitError(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitted(true);

    if (name.trim() === '' || email.trim() === '' || body.trim() === '') {
      return;
    }

    setHasSubmitError(false);
    setIsSubmitting(true);

    client
      .post<Comment>('/comments', { postId, name, email, body })
      .then(loadedComment => {
        onAddComment(loadedComment);
        setBody('');
        setIsSubmitted(false);
      })
      .catch(() => {
        setHasSubmitError(true);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            value={name}
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', {
              'is-danger': hasNameError,
            })}
            onChange={event => setName(event.target.value)}
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
            value={email}
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', {
              'is-danger': hasEmailError,
            })}
            onChange={event => setEmail(event.target.value)}
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
            value={body}
            placeholder="Type comment here"
            className={cn('textarea', {
              'is-danger': hasBodyError,
            })}
            onChange={event => setBody(event.target.value)}
          />
        </div>

        {hasBodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      {hasSubmitError && <p className="help is-danger">Something went wrong</p>}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', {
              'is-loading': isSubmitting,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
