import React, { useState } from 'react';
import cn from 'classnames';
import { CommentData } from '../types/Comment';

type Props = {
  onAddComment: (comment: CommentData) => void;
};

export const NewCommentForm: React.FC<Props> = ({ onAddComment }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    body: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    email?: string;
    body?: string;
  }>({});

  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationFields: typeof validationErrors = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedBody = formData.body.trim();

    if (!trimmedName) {
      validationFields.name = 'Name is required';
    }

    if (!trimmedEmail) {
      validationFields.email = 'Email is required';
    }

    if (!trimmedBody) {
      validationFields.body = 'Enter some text';
    }

    if (Object.keys(validationFields).length > 0) {
      setValidationErrors(validationFields);

      return;
    }

    setIsSubmitting(true);

    try {
      await onAddComment({
        name: trimmedName,
        email: trimmedEmail,
        body: trimmedBody,
      });
      setFormData(prev => ({ ...prev, body: '' }));
      setSubmitError(null);
    } catch (error) {
      setSubmitError('Failed to send comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setValidationErrors(prev => ({ ...prev, [name]: undefined }));

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClearForm = () => {
    setFormData({ name: '', email: '', body: '' });
    setValidationErrors({ name: undefined, email: undefined, body: undefined });
  };

  return (
    <>
      <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
        <div className="field" data-cy="NameField">
          <label className="label" htmlFor="comment-author-name">
            Author Name
          </label>

          <div className="control has-icons-left has-icons-right">
            <input
              type="text"
              name="name"
              value={formData.name}
              id="comment-author-name"
              placeholder="Name Surname"
              className={cn('input', { 'is-danger': validationErrors.name })}
              onChange={handleInputChange}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>

            {validationErrors.name && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>

          {validationErrors.name && (
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
              value={formData.email}
              id="comment-author-email"
              placeholder="email@test.com"
              className={cn('input', { 'is-danger': validationErrors.email })}
              onChange={handleInputChange}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>

            {validationErrors.email && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>

          {validationErrors.email && (
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
              value={formData.body}
              placeholder="Type comment here"
              className={cn('input', { 'is-danger': validationErrors.body })}
              onChange={handleInputChange}
            />
          </div>

          {validationErrors.body && (
            <p className="help is-danger" data-cy="ErrorMessage">
              Enter some text
            </p>
          )}
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              type="submit"
              className={cn('button is-link', { 'is-loading': isSubmitting })}
              disabled={isSubmitting}
            >
              Add
            </button>
          </div>

          <div className="control">
            <button
              type="reset"
              className="button is-link is-light"
              onClick={handleClearForm}
            >
              Clear
            </button>
          </div>
        </div>
      </form>

      {submitError &&
        <div className="notification is-danger" data-cy="CommentsError">
        {submitError}
      </div>
      }
    </>
  );
};
