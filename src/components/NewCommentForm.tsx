import React, { useState } from 'react';
import classNames from 'classnames';
import { CommentData } from '../types/Comment';

interface Props {
  onSubmit: (comment: CommentData) => Promise<void>;
}

export const NewCommentForm: React.FC<Props> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    body: '',
  });

  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = { name: '', email: '', body: '' };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validate();

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);

    if (hasErrors) {
      return;
    }

    setLoading(true);

    try {
      await onSubmit({ name, email, body });

      setBody('');
    } finally {
      setLoading(false);
    }
  };

  const clearError = (field: keyof typeof errors) => {
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const reset = () => {
    setName('');
    setEmail('');
    setBody('');
    setErrors({ name: '', email: '', body: '' });
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            id="comment-author-name"
            type="text"
            value={name}
            onChange={e => {
              setName(e.target.value);
              clearError('name');
            }}
            className={classNames('input', { 'is-danger': errors.name })}
            placeholder="Name Surname"
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {/* Right error icon */}
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
            {errors.name}
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            id="comment-author-email"
            type="text"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              clearError('email');
            }}
            className={classNames('input', { 'is-danger': errors.email })}
            placeholder="email@test.com"
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {/* Right error icon */}
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
            {errors.email}
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-text">
          Comment Text
        </label>

        <textarea
          id="comment-text"
          value={body}
          onChange={e => {
            setBody(e.target.value);
            clearError('body');
          }}
          className={classNames('textarea', { 'is-danger': errors.body })}
          placeholder="Type comment here"
        />

        {errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.body}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', { 'is-loading': loading })}
            data-cy="SubmitButton"
          >
            Add
          </button>
        </div>

        <div className="control">
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
