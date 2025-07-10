import cn from 'classnames';
import React, { useState } from 'react';
import { Comment, CommentData } from '../types/Comment';

const DEFAULT_VALUES: CommentData = {
  name: '',
  email: '',
  body: '',
};

type FormErrors = Partial<Record<keyof CommentData, boolean>>;
type Props = {
  onSubmit: (data: CommentData) => Promise<Comment | void>;
};

function validate(values: CommentData): FormErrors {
  const errors: FormErrors = {};

  if (!values.name) {
    errors.name = true;
  }

  if (!values.email) {
    errors.email = true;
  }

  if (!values.body) {
    errors.body = true;
  }

  return errors;
}

export const NewCommentForm: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<CommentData>(DEFAULT_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name } = e.target;

    setFormData({ ...formData, [name]: e.target.value });

    setErrors(currentErrors => {
      const copy = { ...currentErrors };

      delete copy[name as keyof CommentData];

      return copy;
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newErrors = validate(formData);

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setLoading(true);

    onSubmit(formData).then(() => {
      setFormData(currentData => ({ ...currentData, body: '' }));
      setLoading(false);
    });
  }

  function handleClearForm() {
    setFormData(DEFAULT_VALUES);
    setErrors({});
  }

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={handleClearForm}
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
            className={cn('input', { 'is-danger': errors.name })}
            onChange={handleChange}
            value={formData.name}
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
            className={cn('input', { 'is-danger': errors.email })}
            onChange={handleChange}
            value={formData.email}
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
            className={cn('textarea', { 'is-danger': errors.body })}
            onChange={handleChange}
            value={formData.body}
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
            className={cn('button', 'is-link', { 'is-loading': loading })}
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
