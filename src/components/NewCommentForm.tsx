import React, { useState, useEffect } from 'react';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';
import PropTypes from 'prop-types';

type Props = {
  postId: number;
  onAdd: (comment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, onAdd }) => {
  const STORAGE_KEY = `newCommentForm-${postId}`;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    body?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      const parsed = JSON.parse(saved);

      setName(parsed.name ?? '');
      setEmail(parsed.email ?? '');
      setBody(parsed.body ?? '');
      setSubmitted(Boolean(parsed.submitted));
    }
  }, [STORAGE_KEY]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ name, email, body, submitted }),
    );
  }, [name, email, body, submitted, STORAGE_KEY]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setSubmitError(null);

    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    setIsSubmitting(true);
    try {
      const newComment = await client.post<Comment>('/comments', {
        postId,
        name,
        email,
        body,
      });

      onAdd(newComment);

      setBody('');
      setErrors({});
      setSubmitted(false);
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      setSubmitError('Failed to submit comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setBody('');
    setErrors({});
    setSubmitted(false);
    setSubmitError(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={handleClear}
    >
      {submitError && (
        <div className="notification is-danger">{submitError}</div>
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
            className={`input ${submitted && errors.name ? 'is-danger' : ''}`}
            value={name}
            onChange={e => {
              setName(e.target.value);
              if (errors.name) {
                setErrors({ ...errors, name: undefined });
              }
            }}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {submitted && errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {submitted && errors.name && (
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
            type="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={`input ${submitted && errors.email ? 'is-danger' : ''}`}
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              if (errors.email) {
                setErrors({ ...errors, email: undefined });
              }
            }}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {submitted && errors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {submitted && errors.email && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.email}
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
            className={`textarea ${submitted && errors.body ? 'is-danger' : ''}`}
            placeholder="Type comment here"
            value={body}
            onChange={e => {
              setBody(e.target.value);
              if (errors.body) {
                setErrors({ ...errors, body: undefined });
              }
            }}
          />
        </div>
        {submitted && errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.body}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={`button is-link ${isSubmitting ? 'is-loading' : ''}`}
            disabled={isSubmitting}
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

NewCommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
  onAdd: PropTypes.func.isRequired,
};
