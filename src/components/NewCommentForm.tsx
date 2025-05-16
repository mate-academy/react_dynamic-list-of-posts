import React, { useState } from 'react';
import classNames from 'classnames';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

interface NewCommentFormProps {
  postId: number;
  onAddComment: (comment: Comment) => void;
  onCancel: () => void;
}

interface FormErrors {
  [key: string]: string;
}

export const NewCommentForm: React.FC<NewCommentFormProps> = ({
  postId,
  onAddComment,
  onCancel,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): FormErrors => {
    const validationErrors: FormErrors = {};

    if (!name.trim()) {
      validationErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      validationErrors.email = 'Email is required';
    }

    if (!body.trim()) {
      validationErrors.body = 'Enter some text';
    }

    return validationErrors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);

      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const commentData = { postId, name, email, body };
      const newComment = await client.post<Comment>('/comments', commentData);

      onAddComment(newComment);
      setBody('');
    } catch (err) {
      setErrors({ form: 'Failed to add comment' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setBody('');
    setErrors({});
  };

  const renderFieldError = (fieldName: string) =>
    errors[fieldName] ? (
      <p className="help is-danger" data-cy="ErrorMessage">
        {errors[fieldName]}
      </p>
    ) : null;

  const handleInputChange = (
    field: 'name' | 'email' | 'body',
    value: string,
  ) => {
    if (field === 'name') {
      setName(value);
    }

    if (field === 'email') {
      setEmail(value);
    }

    if (field === 'body') {
      setBody(value);
    }

    if (errors[field]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };

        delete newErrors[field];

        return newErrors;
      });
    }
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
            className={classNames('input', { 'is-danger': errors.name })}
            value={name}
            onChange={e => handleInputChange('name', e.target.value)}
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

        {renderFieldError('name')}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="email"
            id="comment-author-email"
            name="email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': errors.email })}
            value={email}
            onChange={e => handleInputChange('email', e.target.value)}
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

        {renderFieldError('email')}
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
            className={`textarea ${errors.body ? 'is-danger' : ''}`}
            value={body}
            onChange={e => handleInputChange('body', e.target.value)}
          />
        </div>

        {renderFieldError('body')}
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
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>

        <div className="control">
          <button
            type="button"
            className="button is-link is-light"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>

      {errors.form && (
        <div className="notification is-danger" data-cy="FormError">
          {errors.form}
        </div>
      )}
    </form>
  );
};
