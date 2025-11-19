import React, { useEffect, useState } from 'react';
import { CommentData } from '../types/Comment';

type Props = {
  onSubmit: (data: CommentData) => Promise<void> | void;
  isSubmitting: boolean;
};

type Errors = Partial<Record<keyof CommentData, string>>;

export const NewCommentForm: React.FC<Props> = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState<CommentData>({
    name: '',
    email: '',
    body: '',
  });

  const [errors, setErrors] = useState<Errors>({});
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const validate = (data: CommentData): Errors => {
    const newErrors: Errors = {};

    if (!data.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!data.email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!data.body.trim()) {
      newErrors.body = 'Enter some text';
    }

    return newErrors;
  };

  useEffect(() => {
    if (wasSubmitted) {
      setErrors(validate(formData));
    }
  }, [formData, wasSubmitted]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData(current => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setWasSubmitted(true);

    const validationErrors = validate(formData);

    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some(Boolean);

    if (hasErrors) {
      return;
    }

    try {
      await onSubmit(formData);

      setFormData(prev => ({
        ...prev,
        body: '',
      }));

      setErrors({});
      setWasSubmitted(false);
    } catch {}
  };

  const handleClear = () => {
    setFormData({ name: '', email: '', body: '' });
    setErrors({});
    setWasSubmitted(false);
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
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={`input${errors.name ? ' is-danger' : ''}`}
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
            className={`input${errors.email ? ' is-danger' : ''}`}
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
            className={`textarea${errors.body ? ' is-danger' : ''}`}
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
            className={`button is-link${isSubmitting ? ' is-loading' : ''}`}
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
      </div>
    </form>
  );
};
