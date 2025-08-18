/* eslint-disable @typescript-eslint/indent */
import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import { CommentData } from '../types/Comment';

type Props = {
  onSubmit: (data: CommentData) => Promise<void> | void;
  isSubmitting?: boolean;
  submitError?: string | null;
  onRetry?: () => void;
};

type Errors = Partial<Record<keyof CommentData, string>>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const NewCommentForm: React.FC<Props> = ({
  onSubmit,
  isSubmitting = false,
  submitError = null,
  onRetry,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const [touched, setTouched] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const validate = useMemo(
    () =>
      (values: CommentData): Errors => {
        const e: Errors = {};

        if (!values.name.trim()) {
          e.name = 'Name is required';
        }

        if (!values.email.trim()) {
          e.email = 'Email is required';
        } else if (!emailRegex.test(values.email)) {
          e.email = 'Email is not valid';
        }

        if (!values.body.trim()) {
          e.body = 'Enter some text';
        }

        return e;
      },
    [],
  );

  const values = { name, email, body };
  const showError = (field: keyof CommentData) => {
    if (!touched) {
      return null;
    }

    return errors[field] || null;
  };

  const onFieldChange =
    (setter: (value: string) => void, field: keyof CommentData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(e.target.value);
      if (touched && errors[field]) {
        setErrors(prev => {
          const next = { ...prev };

          delete next[field];

          return next;
        });
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    const v = validate(values);

    setErrors(v);
    if (Object.keys(v).length > 0) {
      return;
    }

    await onSubmit(values);

    if (!submitError) {
      setBody('');
      setErrors({});
      setTouched(false);
    }
  };

  const handleReset = () => {
    setBody('');
    setErrors({});
    setTouched(false);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      {submitError && (
        <div className="notification is-danger is-light mb-4">
          {submitError}{' '}
          {onRetry && (
            <button
              type="button"
              className="button is-small is-danger is-light"
              onClick={onRetry}
            >
              Retry
            </button>
          )}
        </div>
      )}

      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>
        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': Boolean(showError('name')),
            })}
            value={name}
            onChange={onFieldChange(setName, 'name')}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {showError('name') && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {showError('name') && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {showError('name')}
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
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': Boolean(showError('email')),
            })}
            value={email}
            onChange={onFieldChange(setEmail, 'email')}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {showError('email') && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {showError('email') && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {showError('email')}
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
            placeholder="Type comment here"
            className={classNames('textarea', {
              'is-danger': Boolean(showError('body')),
            })}
            value={body}
            onChange={onFieldChange(setBody, 'body')}
          />
        </div>
        {showError('body') && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {showError('body')}
          </p>
        )}
      </div>

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
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
