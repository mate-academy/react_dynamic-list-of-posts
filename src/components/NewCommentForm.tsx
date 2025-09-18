import React, { useCallback } from 'react';
import { CommentData, Comment } from '../types/Comment';

type Props = {
  onAddComment?: (comment: CommentData) => Promise<Comment>;
};

export const NewCommentForm: React.FC<Props> = ({ onAddComment }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    body: '',
  });

  const [errors, setErrors] = React.useState({
    name: false,
    email: false,
    body: false,
  });

  const [touched, setTouched] = React.useState({
    name: false,
    email: false,
    body: false,
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const validateEmail = useCallback((email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  }, []);

  const validateField = useCallback(
    (name: string, value: string) => {
      switch (name) {
        case 'name':
          return value.trim().length > 0;
        case 'email':
          return value.trim().length > 0 && validateEmail(value);
        case 'body':
          return value.trim().length > 0;
        default:
          return true;
      }
    },
    [validateEmail],
  );

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));

    if (touched[name as keyof typeof touched]) {
      const isValid = validateField(name, value);

      setErrors(prevState => ({
        ...prevState,
        [name]: !isValid,
      }));
    }
  };

  const handleBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    // Only validate if already touched (after first submit)
    if (touched[name as keyof typeof touched]) {
      const isValid = validateField(name, value);

      setErrors(prevState => ({
        ...prevState,
        [name]: !isValid,
      }));
    }
  };

  const validateForm = useCallback(() => {
    const newErrors = {
      name: !validateField('name', formData.name),
      email: !validateField('email', formData.email),
      body: !validateField('body', formData.body),
    };

    setErrors(newErrors);
    setTouched({ name: true, email: true, body: true });

    return !Object.values(newErrors).some(error => error);
  }, [formData.name, formData.email, formData.body, validateField]);

  const handleReset = useCallback(() => {
    setFormData({ name: '', email: '', body: '' });
    setErrors({ name: false, email: false, body: false });
    setTouched({ name: false, email: false, body: false });
    setIsSubmitting(false);
    setSubmitError(null);
  }, []);

  const clearFormAfterSubmit = useCallback(() => {
    setFormData(prev => ({ ...prev, body: '' }));
    setErrors({ name: false, email: false, body: false });
    setTouched(prev => ({ ...prev, body: false }));
    setSubmitError(null);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!validateForm() || !onAddComment || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const commentData = {
        name: formData.name,
        email: formData.email,
        body: formData.body,
      };

      await onAddComment(commentData);
      clearFormAfterSubmit();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to add comment';

      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }, [
    formData.name,
    formData.email,
    formData.body,
    onAddComment,
    isSubmitting,
    validateForm,
    clearFormAfterSubmit,
  ]);

  return (
    <form
      data-cy="NewCommentForm"
      onReset={handleReset}
      onSubmit={async e => {
        e.preventDefault();
        await handleSubmit();
      }}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            onBlur={handleBlur}
            id="comment-author-name"
            placeholder="Name Surname"
            className={`input ${errors.name ? 'is-danger' : ''}`}
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
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            id="comment-author-email"
            placeholder="email@test.com"
            className={`input ${errors.email ? 'is-danger' : ''}`}
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
            {formData.email.trim() === ''
              ? 'Email is required'
              : 'Please enter a valid email'}
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
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="Type comment here"
            className={`textarea ${errors.body ? 'is-danger' : ''}`}
          />
        </div>

        {errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        {submitError && (
          <div className="notification is-danger" data-cy="SubmitError">
            <button
              type="button"
              className="delete"
              onClick={() => setSubmitError(null)}
              aria-label="close"
            />
            {submitError}
          </div>
        )}

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
          <button
            type="reset"
            className="button is-link is-light"
            disabled={isSubmitting}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
