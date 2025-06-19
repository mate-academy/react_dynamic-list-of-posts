import React, { useState } from 'react';
import cn from 'classnames';
import { CommentData } from '../entities/Comment';
import { FormErrors } from '../entities/Error';

type Props = {
  onSubmit: (data: CommentData) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({ onSubmit }) => {
  const [formFields, setFormFields] = useState<CommentData>({
    name: '',
    email: '',
    body: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({
    name: false,
    email: false,
    body: false,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrors(currentErrors => ({
      ...currentErrors,
      [event.target.name]: false,
    }));
    setFormFields(currentFormFields => ({
      ...currentFormFields,
      [event.target.name]: event.target.value,
    }));
  };

  const handleTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setErrors(currentErrors => ({ ...currentErrors, body: false }));
    setFormFields(currentFormFields => ({
      ...currentFormFields,
      body: event.target.value,
    }));
  };

  const clearForm = () => {
    setFormFields({ name: '', email: '', body: '' });
    setErrors({ name: false, email: false, body: false });
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newErrors: FormErrors = {
      name: !formFields.name.trim(),
      email: !formFields.email.trim(),
      body: !formFields.body.trim(),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);

    if (hasErrors) {
      return;
    }

    setLoading(true);
    onSubmit(formFields)
      .then(() => {
        setFormFields(currentFormFields => ({
          ...currentFormFields,
          body: '',
        }));
        setErrors({ name: false, email: false, body: false });
      })
      .finally(() => setLoading(false));
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmitForm}>
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
            value={formFields.name}
            onChange={handleInputChange}
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
            value={formFields.email}
            onChange={handleInputChange}
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
            value={formFields.body}
            onChange={handleTextArea}
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
            className={cn('button is-link', { 'is-loading': loading })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            onClick={clearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
