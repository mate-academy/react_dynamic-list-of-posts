import React, { useState } from 'react';
import { client } from '../../utils/fetchClient';
import type { CommentFormData } from '../../types/CommentFormData';
import { Comment } from '../../types/Comment';
import './CommentForm.scss';
import classNames from 'classnames';

interface Props {
  postId: number;
  onSubmit: (comment: Comment) => void;
  onCancel: () => void;
}

export const CommentForm: React.FC<Props> = ({
  postId,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<CommentFormData>({
    name: '',
    email: '',
    body: '',
  });

  const [errors, setErrors] = useState<Partial<CommentFormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: Partial<CommentFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.body.trim()) {
      newErrors.body = 'Comment is required';
    } else if (formData.body.length < 10) {
      newErrors.body = 'Comment must be at least 10 characters long';
    } else if (formData.body.length > 1000) {
      newErrors.body = 'Comment must not exceed 1000 characters';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const newComment = await client.post<CommentFormData>('/comments', {
        postId,
        ...formData,
      });

      onSubmit(newComment);
      setIsLoading(false);

      setFormData(prevData => ({
        ...prevData,
        body: '',
      }));
    } catch (error) {
      setErrors({ body: 'Failed to add comment' });
      setIsLoading(false);
    }
  };

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors for this field if any
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleFormReset = () => {
    setFormData({
      name: '',
      email: '',
      body: '',
    });
    setErrors({});
  };

  return (
    <form className="box" data-cy="NewCommentForm" onSubmit={handleSubmit}>
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
              'is-danger': !!errors.name,
            })}
            value={formData.name}
            onChange={handleFieldChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!!errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!!errors.name && (
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
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': !!errors.email,
            })}
            value={formData.email}
            onChange={handleFieldChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {!!errors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!!errors.email && (
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
            className={classNames('textarea', {
              'is-danger': !!errors.body,
            })}
            value={formData.body}
            onChange={handleFieldChange}
          />
        </div>

        {!!errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.body}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
              'is-loading': isLoading,
            })}
            data-cy="SubmitButton"
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            data-cy="ClearButton"
            onClick={handleFormReset}
          >
            Clear
          </button>
        </div>

        <div className="control">
          <button
            type="button"
            className="button is-link is-light"
            data-cy="CancelButton"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};
