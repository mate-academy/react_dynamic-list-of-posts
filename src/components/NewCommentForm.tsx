import React, { useState } from 'react';

import type { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type FormValues = {
  name: string;
  email: string;
  body: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  body?: string;
};

type Props = {
  postId: number;
  onAddComment: (comment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, onAddComment }) => {
  const [formData, setFormData] = useState<FormValues>({
    name: '',
    email: '',
    body: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    const fieldName = name as keyof FormValues;

    setFormData(current => ({
      ...current,
      [fieldName]: value,
    }));

    setFormErrors(current => ({
      ...current,
      [fieldName]: undefined,
    }));

    setSubmitError(false);
  };

  const clearForm = () => {
    setFormData({
      name: '',
      email: '',
      body: '',
    });

    setFormErrors({});
    setSubmitError(false);
  };

  const formHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!formData.email.includes('@') || !formData.email.includes('.')) {
      errors.email = 'Email is not valid';
    }

    if (!formData.body.trim()) {
      errors.body = 'Enter some text';
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsLoading(true);
    setSubmitError(false);

    try {
      const newComment = await client.post<Comment>('/comments', {
        postId,
        ...formData,
      });

      onAddComment(newComment);

      setFormData(current => ({
        ...current,
        body: '',
      }));

      setFormErrors({});
      setIsSubmitted(false);
    } catch {
      setSubmitError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={formHandler} noValidate>
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
            className={`input ${formErrors.name ? 'is-danger' : ''}`}
            value={formData.name}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {formErrors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formErrors.name && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {formErrors.name}
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
            className={`input ${formErrors.email ? 'is-danger' : ''}`}
            value={formData.email}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {formErrors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formErrors.email && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {formErrors.email}
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
            className={`textarea ${formErrors.body ? 'is-danger' : ''}`}
            value={formData.body}
            onChange={handleChange}
          />
        </div>

        {formErrors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {formErrors.body}
          </p>
        )}
      </div>

      {submitError && (
        <div className="notification is-danger">
          Something went wrong. Please try again.
        </div>
      )}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={`button is-link ${isLoading ? 'is-loading' : ''}`}
            disabled={isLoading}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="button"
            className="button is-link is-light"
            onClick={clearForm}
            disabled={isLoading}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
