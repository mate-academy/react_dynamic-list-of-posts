import React, { useState } from 'react';
import { CommentData } from '../types/Comment';

interface Props {
  onSubmit: (comment: CommentData) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const NewCommentForm: React.FC<Props> = ({
  onSubmit,
  onCancel,
  isSubmitting,
}) => {
  const [formData, setFormData] = useState<CommentData>({
    name: '',
    email: '',
    body: '',
  });
  const [errors, setErrors] = useState<Partial<CommentData>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name as keyof CommentData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<CommentData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.body.trim()) {
      newErrors.body = 'Enter some text';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      await onSubmit(formData);
      setFormData(prev => ({ ...prev, body: '' }));
    } catch (error) {}
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({
      name: '',
      email: '',
      body: '',
    });
    setErrors({});
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
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
            className={`input ${errors.name ? 'is-danger' : ''}`}
            value={formData.name}
            onChange={handleChange}
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
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={`input ${errors.email ? 'is-danger' : ''}`}
            value={formData.email}
            onChange={handleChange}
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
            className={`textarea ${errors.body ? 'is-danger' : ''}`}
            value={formData.body}
            onChange={handleChange}
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
            disabled={isSubmitting}
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
          >
            Clear
          </button>
        </div>
        <div className="control">
          <button
            type="button"
            className="button is-link is-light"
            onClick={onCancel}
            data-cy="CancelButton"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};
