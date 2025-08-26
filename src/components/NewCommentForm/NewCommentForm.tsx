import classNames from 'classnames';
import React, { useState } from 'react';
import { Comment } from '../../types/Comment';

const defaultValues = {
  name: '',
  email: '',
  body: '',
};

type FormValues = typeof defaultValues;

type FormErrors = Partial<Record<keyof FormValues, string>>;

function validate({ name, email, body }: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!name.trim()) {
    errors.name = 'Name is required';
  }

  if (!email.trim()) {
    errors.email = 'Email is required';
  }

  if (!body.trim()) {
    errors.body = 'Comment text is required';
  }

  return errors;
}

interface Props {
  postId: number;
  onAddComment: (value: Omit<Comment, 'id'>) => Promise<void>;
}

export const NewCommentForm: React.FC<Props> = ({ postId, onAddComment }) => {
  const [values, setValues] = React.useState<FormValues>(defaultValues);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors = validate(values);

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsCreating(true);
    onAddComment({ postId, ...values })
      .then(() => setValues(prev => ({ ...prev, body: '' })))
      .catch()
      .finally(() => setIsCreating(false));
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
            value={values.name}
            className={classNames('input', { 'is-danger': errors.name })}
            onChange={event => {
              setValues(prev => ({
                ...prev,
                name: event.target.value,
              }));
              setErrors(prev => ({ ...prev, name: '' }));
            }}
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
            value={values.email}
            className={classNames('input', { 'is-danger': errors.email })}
            onChange={event => {
              setValues(prev => ({
                ...prev,
                email: event.target.value,
              }));
              setErrors(prev => ({ ...prev, email: '' }));
            }}
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
            value={values.body}
            className={classNames('textarea', { 'is-danger': errors.body })}
            onChange={event => {
              setValues(prev => ({
                ...prev,
                body: event.target.value,
              }));
              setErrors(prev => ({ ...prev, body: '' }));
            }}
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
              'is-loading': isCreating,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={() => {
              setValues(defaultValues);
              setErrors({});
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
