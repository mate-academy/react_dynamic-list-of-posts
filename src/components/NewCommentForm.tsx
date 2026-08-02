import classNames from 'classnames';
import React, { useState } from 'react';
import { CommentData } from '../types/Comment';

interface Props {
  isSubmitting: boolean;
  onSubmitSuccess: (comment: CommentData) => void;
}

const DEFAULT_FORM_VALUES = {
  name: '',
  email: '',
  comment: '',
};

const DEFAULT_FORM_ERRORS = { ...DEFAULT_FORM_VALUES };

export const NewCommentForm = ({ isSubmitting, onSubmitSuccess }: Props) => {
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);
  const [formErrors, setFormErrors] = useState(DEFAULT_FORM_ERRORS);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormErrors({ ...formErrors, name: '' });
    setFormValues({ ...formValues, name: event.target.value });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormErrors({ ...formErrors, email: '' });
    setFormValues({ ...formValues, email: event.target.value });
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFormErrors({ ...formErrors, comment: '' });
    setFormValues({ ...formValues, comment: event.target.value });
  };

  const handleFormReset = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormValues(DEFAULT_FORM_VALUES);
    setFormErrors(DEFAULT_FORM_ERRORS);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors = { ...formErrors };

    const fields = Object.fromEntries(
      Object.entries(formValues).map(([key, values]) => {
        return [key, values.trim()];
      }),
    );

    if (!fields.name) {
      newErrors.name = 'Name is required';
    }

    if (!fields.email) {
      newErrors.email = 'Email is required';
    }

    if (!fields.comment) {
      newErrors.comment = 'Enter some text';
    }

    if (Object.values(newErrors).some(error => error)) {
      setFormErrors({ ...newErrors });

      return;
    }

    const { comment: body, ...otherFormData } = fields;

    const newComment = { body, ...otherFormData };

    try {
      await onSubmitSuccess(newComment as CommentData);
      setFormValues({ ...formValues, comment: '' });
    } catch {
      setFormValues({ ...formValues });
    }
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={handleFormReset}
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
            className={classNames('input', { 'is-danger': formErrors.name })}
            onChange={handleNameChange}
            value={formValues.name}
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
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': formErrors.email })}
            onChange={handleEmailChange}
            value={formValues.email}
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
            className={classNames('textarea', {
              'is-danger': formErrors.comment,
            })}
            onChange={handleCommentChange}
            value={formValues.comment}
          />
        </div>

        {formErrors.comment && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {formErrors.comment}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': isSubmitting,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
