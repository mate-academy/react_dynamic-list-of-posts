import React, { useState } from 'react';
import classNames from 'classnames';

import { CommentData } from '../types/Comment';

interface Props {
  onSubmit: (data: CommentData) => Promise<void>;
}

interface Errors {
  name: boolean;
  email: boolean;
  body: boolean;
}

export const NewCommentForm: React.FC<Props> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const [errors, setErrors] = useState<Errors>({
    name: false,
    email: false,
    body: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const clearErrors = () => {
    setErrors({
      name: false,
      email: false,
      body: false,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: Errors = {
      name: name.trim() === '',
      email: email.trim() === '',
      body: body.trim() === '',
    };

    setErrors(newErrors);

    if (newErrors.name || newErrors.email || newErrors.body) {
      return;
    }

    try {
      setIsLoading(true);

      await onSubmit({
        name: name.trim(),
        email: email.trim(),
        body: body.trim(),
      });

      setBody('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setBody('');
    clearErrors();
  };

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
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': errors.name,
            })}
            value={name}
            onChange={event => {
              setName(event.target.value);

              if (errors.name) {
                setErrors(prev => ({
                  ...prev,
                  name: false,
                }));
              }
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
            className={classNames('input', {
              'is-danger': errors.email,
            })}
            value={email}
            onChange={event => {
              setEmail(event.target.value);

              if (errors.email) {
                setErrors(prev => ({
                  ...prev,
                  email: false,
                }));
              }
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
            className={classNames('textarea', {
              'is-danger': errors.body,
            })}
            value={body}
            onChange={event => {
              setBody(event.target.value);

              if (errors.body) {
                setErrors(prev => ({
                  ...prev,
                  body: false,
                }));
              }
            }}
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
            className={classNames('button is-link', {
              'is-loading': isLoading,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
