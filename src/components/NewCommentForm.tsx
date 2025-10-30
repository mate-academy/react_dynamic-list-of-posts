import classNames from 'classnames';
import React, { useState } from 'react';
import { CommentData } from '../types/Comment';

type Props = {
  onFormSubmit: (data: CommentData, clearFormBody: () => void) => void;
  loading: boolean;
};
export const NewCommentForm: React.FC<Props> = ({ onFormSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    body: '',
  });

  const [errorForm, setErrorForm] = useState({
    name: false,
    email: false,
    body: false,
  });

  const clearFormBody = () => {
    setFormData(prev => ({ ...prev, body: '' }));
  };

  function handleSubmitForm(e: React.FormEvent) {
    e.preventDefault();

    const errors = {
      name: !formData.name.trim(),
      email: !formData.email.trim(),
      body: !formData.body.trim(),
    };

    if (Object.values(errors).some(error => error)) {
      setErrorForm(errors);

      return;
    }

    onFormSubmit(formData, clearFormBody);
  }

  function handleFormChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

    setErrorForm({
      ...errorForm,
      [event.target.name]: false,
    });
  }

  function handleClearForm() {
    setFormData({
      name: '',
      email: '',
      body: '',
    });
    setErrorForm({
      name: false,
      email: false,
      body: false,
    });
  }

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
            value={formData.name}
            onChange={handleFormChange}
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': errorForm.name,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errorForm.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorForm.name && (
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
            className={classNames('input', {
              'is-danger': errorForm.email,
            })}
            value={formData.email}
            onChange={handleFormChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errorForm.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorForm.email && (
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
            className={classNames('textarea', {
              'is-danger': errorForm.body,
            })}
            onChange={handleFormChange}
            value={formData.body}
          />
        </div>

        {errorForm.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
              'is-loading': loading,
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
            onClick={handleClearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
