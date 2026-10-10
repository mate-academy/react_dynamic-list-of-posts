import PropTypes from 'prop-types';
import React, { useState } from 'react';
import classNames from 'classnames';
import { CommentData } from '../types/Comment';

type Props = {
  onSubmit: (data: CommentData) => Promise<void>;
};

const emptyValues: CommentData = {
  name: '',
  email: '',
  body: '',
};

const fields = [
  {
    name: 'name',
    label: 'Author Name',
    id: 'comment-author-name',
    placeholder: 'Name Surname',
    selector: 'NameField',
    icon: 'fa-user',
    error: 'Name is required',
  },
  {
    name: 'email',
    label: 'Author Email',
    id: 'comment-author-email',
    placeholder: 'email@test.com',
    selector: 'EmailField',
    icon: 'fa-envelope',
    error: 'Email is required',
  },
  {
    name: 'body',
    label: 'Comment Text',
    id: 'comment-body',
    placeholder: 'Type comment here',
    selector: 'BodyField',
    icon: '',
    error: 'Enter some text',
  },
] as const;

export const NewCommentForm: React.FC<Props> = ({ onSubmit }) => {
  const [values, setValues] = useState<CommentData>(emptyValues);
  const [errors, setErrors] = useState(emptyValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (name: keyof CommentData, value: string) => {
    setValues(current => ({ ...current, [name]: value }));
    setErrors(current => ({ ...current, [name]: '' }));
    setSubmitError('');
  };

  const handleReset = () => {
    setValues({ ...emptyValues });
    setErrors({ ...emptyValues });
    setSubmitError('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const data: CommentData = {
      name: values.name.trim(),
      email: values.email.trim(),
      body: values.body.trim(),
    };

    const nextErrors = {
      name: data.name ? '' : 'Name is required',
      email: data.email ? '' : 'Email is required',
      body: data.body ? '' : 'Enter some text',
    };

    setErrors(nextErrors);
    setSubmitError('');

    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(data);
      setValues(current => ({ ...current, body: '' }));
    } catch {
      setSubmitError('Unable to add a comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      {fields.map(field => (
        <div key={field.name} className="field" data-cy={field.selector}>
          <label className="label" htmlFor={field.id}>
            {field.label}
          </label>

          <div
            className={classNames('control', {
              'has-icons-left has-icons-right': field.name !== 'body',
            })}
          >
            {field.name === 'body' ? (
              <textarea
                id={field.id}
                name={field.name}
                placeholder={field.placeholder}
                className={classNames('textarea', {
                  'is-danger': Boolean(errors[field.name]),
                })}
                value={values[field.name]}
                onChange={event => handleChange(field.name, event.target.value)}
                disabled={isSubmitting}
              />
            ) : (
              <input
                type="text"
                id={field.id}
                name={field.name}
                placeholder={field.placeholder}
                className={classNames('input', {
                  'is-danger': Boolean(errors[field.name]),
                })}
                value={values[field.name]}
                onChange={event => handleChange(field.name, event.target.value)}
                disabled={isSubmitting}
              />
            )}

            {field.name !== 'body' && (
              <span className="icon is-small is-left">
                <i className={`fas ${field.icon}`} aria-hidden="true" />
              </span>
            )}

            {field.name !== 'body' && errors[field.name] && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" aria-hidden="true" />
              </span>
            )}
          </div>

          {errors[field.name] && (
            <p className="help is-danger" data-cy="ErrorMessage">
              {field.error}
            </p>
          )}
        </div>
      ))}

      {submitError && (
        <div className="notification is-danger">{submitError}</div>
      )}

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
          {/* eslint-disable-next-line react/button-has-type */}
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

NewCommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
