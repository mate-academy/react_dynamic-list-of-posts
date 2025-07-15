import React, { useState } from 'react';
import { fetchClient } from '../utils/fetchClient';

type NewCommentFormProps = {
  postId: number;
  onAdd: (comment: {
    id: number;
    postId: number;
    name: string;
    email: string;
    body: string;
  }) => void;
  onClose: () => void;
};

export const NewCommentForm: React.FC<NewCommentFormProps> = ({
  postId,
  onAdd,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    body: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = () => {
    const newErrors = {
      name: name.trim() ? '' : 'Name is required',
      email: email.trim()
        ? /\S+@\S+\.\S+/.test(email)
          ? ''
          : 'Email is invalid'
        : 'Email is required',
      body: body.trim() ? '' : 'Enter some text',
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const newComment = await fetchClient.post('/comments', {
        postId,
        name,
        email,
        body,
      });

      onAdd(newComment);
      setBody('');
      setErrors({ name: '', email: '', body: '' });
    } catch {
      setSubmitError('Failed to add comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setBody('');
    setErrors({ name: '', email: '', body: '' });
    setSubmitError(null);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit} noValidate>
      {/* Name field */}
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>
        <div className="control has-icons-left has-icons-right">
          <input
            id="comment-author-name"
            type="text"
            placeholder="Name Surname"
            className={`input ${errors.name && 'is-danger'}`}
            value={name}
            onChange={e => setName(e.target.value)}
            disabled={isSubmitting}
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

      {/* Email field */}
      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>
        <div className="control has-icons-left has-icons-right">
          <input
            id="comment-author-email"
            type="email"
            placeholder="email@test.com"
            className={`input ${errors.email && 'is-danger'}`}
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={isSubmitting}
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

      {/* Body field */}
      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>
        <div className="control has-icons-right">
          <textarea
            id="comment-body"
            placeholder="Type comment here"
            className={`textarea ${errors.body && 'is-danger'}`}
            value={body}
            onChange={e => setBody(e.target.value)}
            disabled={isSubmitting}
          />
          {errors.body && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.body}
          </p>
        )}
      </div>

      {/* Error on submit */}
      {submitError && (
        <div className="notification is-danger" data-cy="SubmitError">
          {submitError}
        </div>
      )}

      {/* Buttons */}
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
            onClick={handleReset}
            disabled={isSubmitting}
            data-cy="ClearButton"
          >
            Clear
          </button>
        </div>

        <div className="control">
          <button
            type="button"
            className="button is-danger is-light"
            onClick={onClose}
            disabled={isSubmitting}
            data-cy="CloseButton"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};
