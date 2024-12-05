import React, { useState } from 'react';
import classNames from 'classnames';

const defaultValues = {
  postId: 0,
  name: '',
  email: '',
  body: '',
};

type FormValues = typeof defaultValues;

type FormErrors = Partial<Record<keyof FormValues, string>>;

type Props = {
  currentPostId: number;
  addComment: (comment: FormValues) => void;
  isCommentCreating: boolean;
};

export const NewCommentForm: React.FC<Props> = ({
  currentPostId,
  addComment,
  isCommentCreating,
}) => {
  const [values, setValues] = useState<FormValues>(defaultValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setValues((prev: FormValues) => ({
      ...prev,
      postId: currentPostId,
      [name]: value,
    }));
    setErrors((prev: FormErrors) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: FormErrors = {};

    if (!values.name) {
      newErrors.name = 'Name is required';
    }

    if (!values.email) {
      newErrors.email = 'Email is required';
    }

    if (!values.body) {
      newErrors.body = 'Enter some text';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    addComment(values);
    setValues((prev: FormValues) => ({
      ...prev,
      body: '',
    }));
  };

  const handleClear = () => {
    setValues(defaultValues);
    setErrors({});
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleFormSubmit}>
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
            onChange={handleFormChange}
            className={classNames('input', {
              'is-danger': errors.name,
            })}
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
            onChange={handleFormChange}
            className={classNames('input', {
              'is-danger': errors.email,
            })}
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
            onChange={handleFormChange}
            className={classNames('textarea', {
              'is-danger': errors.body,
            })}
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
              'is-loading': isCommentCreating,
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
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
