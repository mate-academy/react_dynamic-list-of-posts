import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { CommentData } from '../types/Comment';

interface NewCommentFormProps {
  onNewComment: (newComment: CommentData) => Promise<void>;
}

const initialValues = { name: '', email: '', body: '' };
const initialErrors = { name: false, email: false, body: false };

export const NewCommentForm: React.FC<NewCommentFormProps> = ({
  onNewComment,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setValues(currentValues => ({
      ...currentValues,
      [name]: value,
    }));
    setErrors(currentErrors => ({
      ...currentErrors,
      [name]: false,
    }));
  }

  function handleReset() {
    setValues(initialValues);
    setErrors(initialErrors);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const newErrors = {
      name: !values.name.trim(),
      email: !values.email.trim(),
      body: !values.body.trim(),
    };

    setErrors(newErrors);

    if (newErrors.name || newErrors.email || newErrors.body) {
      return;
    }

    setIsLoading(true);

    try {
      await onNewComment({
        name: values.name.trim(),
        email: values.email.trim(),
        body: values.body.trim(),
      });

      setValues(currentValues => ({ ...currentValues, body: '' }));
    } catch {
      alert('Please, try again!');
    } finally {
      setIsLoading(false);
    }
  }

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
            className={classNames('input', { 'is-danger': errors.name })}
            value={values.name}
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
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': errors.email })}
            value={values.email}
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
            Email is required
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
            value={values.body}
            onChange={handleChange}
          />
        </div>

        {errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': isLoading,
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

NewCommentForm.propTypes = {
  onNewComment: PropTypes.func.isRequired,
};
