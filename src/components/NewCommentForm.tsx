import classnames from 'classnames';
import React, { useState } from 'react';
import { CommentData } from '../types/Comment';

type Props = {
  postId: number;
  onSubmit: (data: CommentData & { postId: number }) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, onSubmit }) => {
  const [formState, setFormState] = useState({
    formData: {
      name: '',
      email: '',
      body: '',
    },
    errors: {
      name: false,
      email: {
        empty: false,
        invalid: false,
      },
      body: false,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormState(currState => ({
      ...currState,
      formData: {
        ...currState.formData,
        [name]: value,
      },
      errors: {
        ...currState.errors,
        [name]: name === 'email' ? { empty: false, invalid: false } : false,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedFormData = {
      name: formState.formData.name.trim(),
      email: formState.formData.email.trim(),
      body: formState.formData.body.trim(),
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const newErrors = {
      name: !trimmedFormData.name,
      email: {
        empty: !trimmedFormData.email,
        invalid:
          !!trimmedFormData.email && !emailRegex.test(trimmedFormData.email),
      },
      body: !trimmedFormData.body,
    };

    setFormState(currState => ({
      ...currState,
      errors: newErrors,
    }));

    if (
      newErrors.name ||
      newErrors.email.empty ||
      newErrors.email.invalid ||
      newErrors.body
    ) {
      return;
    }

    setIsLoading(true);

    try {
      await onSubmit({ ...trimmedFormData, postId });

      setFormState(currState => ({
        ...currState,
        formData: {
          ...currState.formData,
          body: '',
        },
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setFormState({
      formData: {
        name: '',
        email: '',
        body: '',
      },
      errors: {
        name: false,
        email: {
          empty: false,
          invalid: false,
        },
        body: false,
      },
    });
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
            className={classnames('input', {
              'is-danger': formState.errors.name,
            })}
            value={formState.formData.name}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {formState.errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formState.errors.name && (
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
            className={classnames('input', {
              'is-danger':
                formState.errors.email.empty || formState.errors.email.invalid,
            })}
            value={formState.formData.email}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {(formState.errors.email.empty || formState.errors.email.invalid) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formState.errors.email.empty && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        )}
        {formState.errors.email.invalid && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is not valid
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
            className={classnames('textarea', {
              'is-danger': formState.errors.body,
            })}
            value={formState.formData.body}
            onChange={handleChange}
          />
        </div>

        {formState.errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classnames('button is-link', {
              'is-loading': isLoading,
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
