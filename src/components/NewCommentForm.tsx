import React, { useState } from 'react';
import { addComment } from '../utils/api';
import { Comment } from '../types/Comment';

type Props = {
  postId: number;
  onCommentAdded: (newComment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, onCommentAdded }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    body?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim() || !/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      newErrors.email = 'Email is required';
    }

    if (!body.trim()) {
      newErrors.body = 'Enter some text';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const newComment: Comment = await addComment({
        postId,
        name,
        email,
        body,
      });

      onCommentAdded(newComment);

      setBody('');
      setErrors({});
    } catch (err) {
      setFormError('Failed to add comment. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setBody('');
    setErrors({});
    setFormError(null);
  };

  return (
    <form onSubmit={handleSubmit} data-cy="NewCommentForm" className="box">
      {formError && (
        <div className="notification is-danger" data-cy="FormError">
          {formError}
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
            className={`input ${errors.name ? 'is-danger' : ''}`}
            value={name}
            onChange={e => {
              setName(e.target.value);
              setErrors(prev => ({ ...prev, name: undefined }));
            }}
            placeholder="Name Surname"
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
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
            className={`input ${errors.email ? 'is-danger' : ''}`}
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setErrors(prev => ({ ...prev, email: undefined }));
            }}
            placeholder="email@test.com"
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
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
            className={`textarea ${errors.body ? 'is-danger' : ''}`}
            value={body}
            onChange={e => {
              setBody(e.target.value);
              setErrors(prev => ({ ...prev, body: undefined }));
            }}
            placeholder="Type comment here"
          />
        </div>

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
            className={`button is-link ${isSubmitting ? 'is-loading' : ''}`}
            data-cy="SubmitButton"
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            className="button is-light is-link"
            onClick={handleClear}
            data-cy="ClearButton"
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
