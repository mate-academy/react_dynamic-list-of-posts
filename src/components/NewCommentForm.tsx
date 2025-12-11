import classNames from 'classnames';
import React, { useState } from 'react';
import { CommentData } from '../types/Comment';

type Props = {
  onSubmit: (commentData: CommentData) => Promise<void>;
};

type InputsType =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

const defaultValues = {
  name: '',
  email: '',
  body: '',
};

type FormValues = typeof defaultValues;
type FormErrors = Partial<Record<keyof FormValues, string>>;

function validate({ name, email, body }: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!name) {
    errors.name = 'Name is required';
  }

  if (!email) {
    errors.email = 'Email is required';
  }

  if (!body) {
    errors.body = 'Enter some text';
  }

  return errors;
}

export const NewCommentForm: React.FC<Props> = ({ onSubmit }) => {
  const [values, setValues] = useState<FormValues>(defaultValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  function resetForm(isFullClear = true) {
    setErrors({});

    if (isFullClear) {
      setValues(defaultValues);
    } else {
      setValues(prev => ({
        ...prev,
        body: '',
      }));
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedValues = {
      name: values.name.trim(),
      email: values.email.trim(),
      body: values.body.trim(),
    };

    const newErrors = validate(trimmedValues);

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      setIsSubmitted(true);
      await onSubmit(trimmedValues);
      resetForm(false);
    } catch {
    } finally {
      setIsSubmitted(false);
    }
  }

  function handleChange(event: InputsType) {
    const { name, value } = event.target;

    setValues(currentValues => ({
      ...currentValues,
      [name]: value,
    }));

    setErrors(currentErrors => {
      const copy = { ...currentErrors };

      delete copy[name as keyof FormValues];

      return copy;
    });
  }

  return (
    <form onSubmit={handleSubmit} data-cy="NewCommentForm">
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={values.name}
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': errors.name })}
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
            value={values.email}
            onChange={handleChange}
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': errors.email })}
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
            value={values.body}
            onChange={handleChange}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('textarea', { 'is-danger': errors.body })}
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
            disabled={isSubmitted}
            type="submit"
            className={classNames('button is-link', {
              'is-loading': isSubmitted,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            onClick={() => resetForm()}
            type="reset"
            className="button is-link is-light"
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
