/* eslint-disable no-console */
import React, { useState } from 'react';
import { CommentData } from '../types/Comment';

interface NewCommentFormProps {
  onSubmit: (data: CommentData) => void;
}

export const NewCommentForm: React.FC<NewCommentFormProps> = ({ onSubmit }) => {
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

  const validate = () => {
    const newErrors: { name?: string; email?: string; body?: string } = {};

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
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({ name, email, body });
      setBody('');
      setErrors({});
      setSubmitted(false);
    } catch (err) {
      console.error('Failed to add comment', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setErrors({});
    setBody('');
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
            id="comment-author-name"
            name="name"
            placeholder="Name Surname"
            className={`input ${submitted && errors.name ? 'is-danger' : ''}`}
            value={name}
            onChange={e => {
              setName(e.target.value);
              if (errors.name) {
                setErrors(prev => ({ ...prev, name: undefined }));
              }
            }}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
          </span>
          {submitted && errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle"></i>
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
            type="text"
            id="comment-author-email"
            name="email"
            placeholder="email@test.com"
            className={`input ${submitted && errors.email ? 'is-danger' : ''}`}
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              if (errors.email) {
                setErrors(prev => ({ ...prev, email: undefined }));
              }
            }}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
          {submitted && errors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle"></i>
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
            name="body"
            placeholder="Type comment here"
            className={`textarea ${submitted && errors.body ? 'is-danger' : ''}`}
            value={body}
            onChange={e => {
              setBody(e.target.value);
              if (errors.body) {
                setErrors(prev => ({ ...prev, body: undefined }));
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
