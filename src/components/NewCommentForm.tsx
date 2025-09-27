import React, { useState } from 'react'; // useState використовується нижче
import classNames from 'classnames';
import { Comment } from '../types/Comment';

interface NewCommentFormProps {
  onSubmit: (name: string, email: string, body: string) => Promise<Comment>;
  onCancel: () => void;
}

interface FormState {
  name: string;
  email: string;
  body: string;
}

interface FormErrors {
  name: string;
  email: string;
  body: string;
}

const initialFormState: FormState = {
  name: '',
  email: '',
  body: '',
};

const initialErrors: FormErrors = {
  name: '',
  email: '',
  body: '',
};

export const NewCommentForm: React.FC<NewCommentFormProps> = ({
  onSubmit,
  onCancel
}) => {
  // Використання useState - ESLint тепер має бачити це
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {
      name: form.name.trim() ? '' : 'Name is required',
      email: form.email.trim() ? '' : 'Email is required',
      body: form.body.trim() ? '' : 'Enter some text',
    };

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.body;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(form.name, form.email, form.body);
      setForm(prev => ({ ...prev, body: '' }));
    } catch {
      setErrors(prev => ({ ...prev, body: 'Failed to submit comment' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm(initialFormState);
    setErrors(initialErrors);
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
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
            className={classNames('input', { 'is-danger': errors.name })}
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
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
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': errors.email })}
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
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
            className={classNames('textarea', { 'is-danger': errors.body })}
            value={form.body}
            onChange={(e) => handleChange('body', e.target.value)}
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
            className={classNames('button', 'is-link', { 'is-loading': isSubmitting })}
            disabled={isSubmitting}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button type="reset" className="button is-link is-light" onClick={handleReset}>
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
    </form>
  );
};
