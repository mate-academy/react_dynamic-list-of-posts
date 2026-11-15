import React, { useState } from 'react';
import { CommentData } from '../types/Comment';

type Props = {
  onSubmit: (data: CommentData) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: string[] = [];

    if (!name.trim()) {
      newErrors.push('name');
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.push('email');
    }

    if (!body.trim()) {
      newErrors.push('body');
    }

    setErrors(newErrors);

    if (newErrors.length > 0) {
      return;
    }

    setIsLoading(true);
    setSubmitError(false);

    try {
      await onSubmit({
        name: name.trim(),
        email: email.trim(),
        body: body.trim(),
      });

      setBody('');
      setErrors([]);
    } catch {
      setSubmitError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handClearForm = () => {
    setName('');
    setEmail('');
    setBody('');
    setErrors([]);
    setSubmitError(false);
  };

  const hasError = (field: string) => errors.includes(field);

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
            className={`input ${hasError('name') ? 'is-danger' : ''}`}
            value={name}
            onChange={event => {
              setName(event.target.value);
              setErrors(prev => prev.filter(error => error !== 'name'));
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasError('name') && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasError('name') && (
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
            className={`input ${hasError('email') ? 'is-danger' : ''}`}
            value={email}
            onChange={event => {
              setEmail(event.target.value);
              setErrors(prev => prev.filter(error => error !== 'email'));
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasError('email') && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasError('email') && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required or invalid
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
            className={`textarea ${hasError('body') ? 'is-danger' : ''}`}
            value={body}
            onChange={event => {
              setBody(event.target.value);
              setErrors(prev => prev.filter(error => error !== 'body'));
            }}
          />
        </div>

        {hasError('body') && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      {submitError && (
        <div className="notification is-danger">
          Something went wrong. Please try again.
        </div>
      )}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={`button is-link ${isLoading ? 'is-loading' : ''}`}
            disabled={isLoading}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handClearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
