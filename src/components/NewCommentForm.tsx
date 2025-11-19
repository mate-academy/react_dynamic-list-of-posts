import React, { useState } from 'react';
import { CommentData } from '../types/Comment';

interface Props {
  defaultName?: string;
  defaultEmail?: string;
  onSubmit: (data: CommentData) => Promise<void> | void;
}

export const NewCommentForm: React.FC<Props> = ({
  defaultName = '',
  defaultEmail = '',
  onSubmit,
}) => {
  const [form, setForm] = useState<CommentData>({
    name: defaultName,
    email: defaultEmail,
    body: '',
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    body?: string;
  }>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (values: CommentData) => {
    const e: typeof errors = {};

    if (!values.name.trim()) {
      e.name = 'Name is required';
    }

    if (!values.email.trim()) {
      e.email = 'Email is required';
    }

    if (!values.body.trim()) {
      e.body = 'Enter some text';
    }

    return e;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm(prev => ({ ...prev, [name]: value }));
    if (submitted) {
      setErrors(prev => ({ ...prev, [name]: undefined })); // remove erro no change após submit
    }
  };

  const handleClear = () => {
    setForm({ name: '', email: '', body: '' }); // mantém name e email
    setErrors({});
    setSubmitError(null);
    setSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const eMap = validate(form);

    setErrors(eMap);
    if (Object.values(eMap).some(Boolean)) {
      return;
    }

    try {
      setLoading(true);
      setSubmitError(null);
      await onSubmit(form);
      // sucesso: manter name e email, limpar body
      setForm(prev => ({ ...prev, body: '' }));
    } catch {
      setSubmitError('Failed to add comment. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form data-cy="NewCommentForm">
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
            className={`input${submitted && errors.name ? ' is-danger' : ''}`}
            value={form.name}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {submitted && errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {submitted && errors.name && (
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
            className={`input${submitted && errors.email ? ' is-danger' : ''}`}
            value={form.email}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {submitted && errors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {submitted && errors.email && (
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
            className={`textarea${submitted && errors.body ? ' is-danger' : ''}`}
            value={form.body}
            onChange={handleChange}
          />
        </div>
        {submitted && errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.body}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={`button is-link${loading ? ' is-loading' : ''}`}
            onClick={handleSubmit}
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
      {submitError && (
        <div className="notification is-danger">{submitError}</div>
      )}
    </form>
  );
};
