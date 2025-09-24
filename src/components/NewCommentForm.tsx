import React, { useState } from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  addComment: (newComment: Omit<Comment, 'id'>) => Promise<Comment>;
  post: Post;
  hasError?: boolean;
};

export const NewCommentForm: React.FC<Props> = ({
  addComment,
  post,
  hasError: externalHasError = false,
}) => {
  const initialFormData = {
    name: '',
    email: '',
    body: '',
  };

  const initialErrors = {
    name: false,
    email: false,
    body: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleFieldChange = (field: keyof typeof formData) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }));
      setErrors(prev => ({ ...prev, [field]: false }));
      setSubmitError(null);
    };
  };

  const validateForm = () => {
    const newErrors = {
      name: formData.name.trim() === '',
      email: formData.email.trim() === '',
      body: formData.body.trim() === '',
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some(Boolean);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSubmitError(null);

    addComment({
      postId: post.id,
      ...formData,
    })
      .then(() => {
        setFormData(prev => ({ ...prev, body: '' }));
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setSubmitError('Failed to add comment. Please try again.');
      });
  };

  const clearForm = () => {
    setFormData(initialFormData);
    setErrors(initialErrors);
    setSubmitError(null);
  };

  const handleClearButtonClick = (e: React.FormEvent) => {
    e.preventDefault();
    clearForm();
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleFormSubmit}>
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
            value={formData.name}
            onChange={handleFieldChange('name')}
            className={classNames('input', { 'is-danger': errors.name })}
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
            value={formData.email}
            onChange={handleFieldChange('email')}
            className={classNames('input', { 'is-danger': errors.email })}
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
            value={formData.body}
            onChange={handleFieldChange('body')}
            className={classNames('textarea', { 'is-danger': errors.body })}
          />
        </div>

        {errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      {(submitError || externalHasError) && (
        <div className="notification is-danger" data-cy="SubmitError">
          {submitError ||
            (externalHasError && 'Failed to add comment. Please try again.')}
        </div>
      )}

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
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClearButtonClick}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
