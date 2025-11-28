import React, { useState } from 'react';
import classNames from 'classnames';
import { FormError } from '../types/FormError';

interface PropsNewCommentForm {
  onSubmit: (comment: {
    name: string;
    email: string;
    body: string;
  }) => Promise<void>;
}

export const NewCommentForm: React.FC<PropsNewCommentForm> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<FormError>({
    name: false,
    email: false,
    body: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const validateForm = () => {
    const newErrors: FormError = {
      name: !name.trim(),
      email: !email.trim(),
      body: !body.trim(),
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(false);

    try {
      await onSubmit({ name, email, body });
      setBody('');
      setErrors({ name: false, email: false, body: false });
    } catch (error) {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setBody('');
    setErrors({ name: false, email: false, body: false });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);

    if (errors.name) {
      setErrors(prevErrors => ({ ...prevErrors, name: false }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    if (errors.email) {
      setErrors(prevErrors => ({ ...prevErrors, email: false }));
    }
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);

    if (errors.body) {
      setErrors(prevErrors => ({ ...prevErrors, body: false }));
    }
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      {submitError && (
        <div className="notification is-danger">
          <button
            className="delete"
            onClick={() => setSubmitError(false)}
            type="button"
          ></button>
          Failed to add comment. Please try again.
        </div>
      )}

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
            onChange={handleNameChange}
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
            onChange={handleEmailChange}
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
            onChange={handleBodyChange}
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
            className={classNames('button', 'is-link', {
              'is-loading': isSubmitting,
            })}
            disabled={isSubmitting}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleReset}
            disabled={isSubmitting}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
