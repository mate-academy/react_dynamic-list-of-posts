import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CommentData } from '../types/Comment';

interface Props {
  postId: number;
  onAdd: (name: string, email: string, body: string) => Promise<void>;
}

interface FormState {
  values: CommentData;
  errors: Partial<Record<keyof CommentData, string>>;
  submissionError: boolean;
}

export const NewCommentForm: React.FC<Props> = ({ onAdd }) => {
  const [state, setState] = useState<FormState>({
    values: { name: '', email: '', body: '' },
    errors: {},
    submissionError: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: keyof CommentData, value: string) => {
    setState(prev => ({
      ...prev,
      values: { ...prev.values, [field]: value },
      errors: { ...prev.errors, [field]: '' },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, body } = state.values;
    const newErrors: Partial<Record<keyof CommentData, string>> = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!body.trim()) {
      newErrors.body = 'Comment text is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setState(prev => ({ ...prev, errors: newErrors }));

      return;
    }

    setIsLoading(true);

    try {
      await onAdd(name.trim(), email.trim(), body.trim());
      setState(prev => ({
        ...prev,
        values: { ...prev.values, body: '' },
        errors: {},
        submissionError: false,
      }));
    } catch (error) {
      setState(prev => ({ ...prev, submissionError: true }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setState({
      values: { name: '', email: '', body: '' },
      errors: {},
      submissionError: false,
    });
  };

  const { values, errors } = state;

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
            id="comment-author-name"
            type="text"
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': errors.name,
            })}
            value={values.name}
            onChange={e => handleChange('name', e.target.value)}
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
            id="comment-author-email"
            type="text"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': errors.email,
            })}
            value={values.email}
            onChange={e => handleChange('email', e.target.value)}
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
            placeholder="Type comment here"
            className={classNames('textarea', {
              'is-danger': errors.body,
            })}
            value={values.body}
            onChange={e => handleChange('body', e.target.value)}
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
              'is-loading': isLoading,
            })}
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
  postId: PropTypes.number.isRequired,
  onAdd: PropTypes.func.isRequired,
};
