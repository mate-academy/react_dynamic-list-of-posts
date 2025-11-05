import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import classNames from 'classnames';

type Props = {
  postId: number;
  onCreate: (data: Omit<Comment, 'id'>) => Promise<Comment>;
};

export const NewCommentForm: React.FC<Props> = ({ postId, onCreate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    body?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [lastPayload, setLastPayload] = useState<Omit<Comment, 'id'> | null>(
    null,
  );

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!body.trim()) {
      newErrors.body = 'Enter some text';
    }

    return newErrors;
  };

  const payload = (): Omit<Comment, 'id'> => ({
    postId,
    name: name.trim(),
    email: email.trim(),
    body: body.trim(),
  });

  const tryCreate = async (data: Omit<Comment, 'id'>) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await onCreate(data);
      setBody('');
      setErrors({});
      setWasSubmitted(false);
      setLastPayload(null);
    } catch {
      setSubmitError('Failed to add comment');
      setLastPayload(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setWasSubmitted(true);
    setSubmitError(null);

    const nextErrors = validate();

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    await tryCreate(payload());
  };

  const handleRetry = async () => {
    if (lastPayload) {
      await tryCreate(lastPayload);
    }
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setName('');
    setEmail('');
    setBody('');
    setErrors({});
    setWasSubmitted(false);
  };

  const onChangeName = (v: string) => {
    setName(v);
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: undefined }));
    }
  };

  const onChangeEmail = (v: string) => {
    setEmail(v);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: undefined }));
    }
  };

  const onChangeBody = (v: string) => {
    setBody(v);
    if (errors.body) {
      setErrors(prev => ({ ...prev, body: undefined }));
    }
  };

  const showNameError = wasSubmitted && !!errors.name;
  const showEmailError = wasSubmitted && !!errors.email;
  const showBodyError = wasSubmitted && !!errors.body;

  return (
    <form onSubmit={handleSubmit} data-cy="NewCommentForm">
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
            className={classNames('input', { 'is-danger': showNameError })}
            value={name}
            onChange={event => onChangeName(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {showNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {showNameError && (
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
            className={classNames('input', { 'is-danger': showEmailError })}
            value={email}
            onChange={event => onChangeEmail(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {showEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {showEmailError && (
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
            className={classNames('textarea', { 'is-danger': showBodyError })}
            value={body}
            onChange={event => onChangeBody(event.target.value)}
          />
        </div>

        {showBodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      {submitError && (
        <div
          className="notification is-danger is-light"
          data-cy="AddCommentError"
        >
          {submitError}
          <button
            type="button"
            className="button is-small is-success is-light ml-2"
            onClick={handleRetry}
            disabled={isSubmitting}
          >
            Retry
          </button>
          <button
            type="button"
            className="button is-small is-danger ml-2"
            onClick={() => setSubmitError(null)}
            disabled={isSubmitting}
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
              'is-loading': isSubmitting,
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
            onClick={handleClear}
            disabled={isSubmitting}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
