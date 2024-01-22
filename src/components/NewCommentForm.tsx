import classNames from 'classnames';
import React, { useState } from 'react';
import { CommentData } from '../types/Comment';

type Props = {
  onAdd?: (comment: CommentData) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({ onAdd = () => {} }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState<CommentData>({
    name: '',
    email: '',
    body: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    body: false,
  });

  const handleChangeFormErrors = (
    field: keyof CommentData,
    newValue: boolean,
  ) => {
    setFormErrors(state => ({
      ...state,
      [field]: newValue,
    }));
  };

  const handleChangeFormFields = (
    field: keyof CommentData,
    newValue: string,
  ) => {
    setFormFields({
      ...formFields,
      [field]: newValue,
    });
    handleChangeFormErrors(field, false);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasErrors = false;

    if (!formFields.name.trim()) {
      handleChangeFormErrors('name', true);
      hasErrors = true;
    }

    if (!formFields.email.trim()) {
      handleChangeFormErrors('email', true);
      hasErrors = true;
    }

    if (!formFields.body.trim()) {
      handleChangeFormErrors('body', true);
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    setIsLoading(true);

    await onAdd(formFields);

    handleChangeFormFields('body', '');
    setIsLoading(false);
  };

  const handleResetForm = (e: React.FormEvent) => {
    e.preventDefault();

    setFormFields({
      name: '',
      email: '',
      body: '',
    });

    setFormErrors({
      name: false,
      email: false,
      body: false,
    });
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmitForm}
      onReset={handleResetForm}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div
          className={classNames('control has-icons-left', {
            'has-icons-right': formErrors.name,
          })}
        >
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': formErrors.name })}
            value={formFields.name}
            onChange={(e) => handleChangeFormFields('name', e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {formErrors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formErrors.name && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div
          className={classNames('control has-icons-left', {
            'has-icons-right': formErrors.email,
          })}
        >
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': formErrors.email })}
            value={formFields.email}
            onChange={(e) => handleChangeFormFields('email', e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {formErrors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formErrors.email && (
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
            className={classNames('textarea', { 'is-danger': formErrors.body })}
            value={formFields.body}
            onChange={(e) => handleChangeFormFields('body', e.target.value)}
          />
        </div>

        {formErrors.body && (
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
