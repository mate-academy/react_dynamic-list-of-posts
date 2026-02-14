import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { CommentData } from '../types/Comment';

interface Props {
  onSubmitForm: (data: CommentData) => Promise<void>;
}

interface FormState {
  name: string;
  email: string;
  body: string;
  errors: {
    name: string;
    email: string;
    body: string;
  };
}

const INITIAL_STATE: FormState = {
  name: '',
  email: '',
  body: '',
  errors: {
    name: '',
    email: '',
    body: '',
  },
};

export const NewCommentForm: React.FC<Props> = ({ onSubmitForm }) => {
  const [formState, setFormState] = useState<FormState>(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { name, email, body, errors } = formState;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name: field, value } = event.target;

    setFormState(current => ({
      ...current,
      [field]: value,
      errors: {
        ...current.errors,
        [field]: '',
      },
    }));
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedName = name.trim();
    const normalizedEmail = email.trim();
    const normalizedBody = body.trim();

    let emailError = '';

    if (!normalizedEmail) {
      emailError = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(normalizedEmail)) {
        emailError = 'Enter a valid email';
      }
    }

    const nameError = !normalizedName ? 'Name is required' : '';
    const bodyError = !normalizedBody ? 'Enter some text' : '';

    if (nameError || emailError || bodyError) {
      setFormState(current => ({
        ...current,
        errors: {
          name: nameError,
          email: emailError,
          body: bodyError,
        },
      }));

      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmitForm({
        name: normalizedName,
        email: normalizedEmail,
        body: normalizedBody,
      });

      setFormState(current => ({
        ...current,
        body: '',
        errors: { name: '', email: '', body: '' },
      }));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleFormSubmit}
      onReset={() => setFormState(INITIAL_STATE)}
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
            className={classNames('input', { 'is-danger': errors.name })}
            value={name}
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
            className={classNames('input', { 'is-danger': errors.email })}
            value={email}
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
            className={classNames('textarea', { 'is-danger': errors.body })}
            value={body}
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
            className={classNames('button is-link', {
              'is-loading': isSubmitting,
            })}
            disabled={isSubmitting}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};

NewCommentForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};
