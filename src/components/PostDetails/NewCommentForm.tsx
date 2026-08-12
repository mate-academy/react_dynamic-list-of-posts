import React, { FormEvent, useState } from 'react';
import cn from 'classnames';

import { CommentData } from '../../types/Comment';

type Props = {
  onSubmit: (data: CommentData) => Promise<void>;
};
type FormErrors = Partial<Record<keyof CommentData, boolean>>;

export const NewCommentForm: React.FC<Props> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const handleReset = () => {
    setName('');
    setEmail('');
    setBody('');
    setErrors({});
  };

  const clearFieldError = (field: keyof CommentData) => {
    setErrors(current => ({ ...current, [field]: false }));
  };

  const validateForm = () => {
    const nextErrors: FormErrors = {
      name: !name.trim(),
      email: !email.trim(),
      body: !body.trim(),
    };

    setErrors(nextErrors);

    return !Object.values(nextErrors).some(Boolean);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const data: CommentData = {
      name,
      email,
      body,
    };

    onSubmit(data)
      .then(() => {
        setBody('');
        setErrors({});
      })
      .catch(() => {
        // The error is already displayed in PostDetails
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form
      data-cy="NewCommentForm"
      onReset={handleReset}
      onSubmit={handleSubmit}
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
            className={cn('input', errors.name && 'is-danger')}
            value={name}
            onChange={event => {
              setName(event.target.value);
              clearFieldError('name');
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.name && (
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
            className={cn('input', errors.email && 'is-danger')}
            value={email}
            onChange={event => {
              setEmail(event.target.value);
              clearFieldError('email');
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.email && (
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
            value={body}
            onChange={e => {
              setBody(e.target.value);
              clearFieldError('body');
            }}
            className={cn('textarea', errors.body && 'is-danger')}
          />
        </div>

        {errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button', 'is-link', isSubmitting && 'is-loading')}
            disabled={isSubmitting}
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
