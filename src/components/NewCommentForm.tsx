import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  onAdd: (data: any) => Promise<void>,
};

export const NewCommentForm: React.FC<Props> = ({ onAdd }) => {
  const [fields, setFields] = useState({
    name: '',
    email: '',
    body: '',
  });

  const [fieldsErrors, setFieldsErrors] = useState({
    name: false,
    email: false,
    body: false,
  });

  const [isCommentPosting, setIsCommentPosting] = useState(false);

  const handleFieldsChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value,
    });

    setFieldsErrors({
      ...fieldsErrors,
      [event.target.name]: false,
    });
  };

  const checkField = (fieldName: keyof typeof fields) => {
    if (!fields[fieldName]) {
      setFieldsErrors(prevErrors => ({ ...prevErrors, [fieldName]: true }));
    }
  };

  const addComment = (event: React.FormEvent) => {
    event.preventDefault();

    checkField('name');
    checkField('email');
    checkField('body');

    if (!fields.name || !fields.email || !fields.body) {
      return;
    }

    setIsCommentPosting(true);

    onAdd(fields)
      .then(() => setFields({ ...fields, body: '' }))
      .finally(() => setIsCommentPosting(false));
  };

  const clearForm = () => {
    setFields({ name: '', email: '', body: '' });
    setFieldsErrors({
      name: false,
      email: false,
      body: false,
    });
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={e => addComment(e)}>
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
            className={classNames('input', {
              'is-danger': fieldsErrors.name,
            })}
            value={fields.name}
            onChange={handleFieldsChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {fieldsErrors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {fieldsErrors.name && (
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
              'is-danger': fieldsErrors.email,
            })}
            value={fields.email}
            onChange={handleFieldsChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {fieldsErrors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {fieldsErrors.email && (
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
              'is-danger': fieldsErrors.body,
            })}
            value={fields.body}
            onChange={handleFieldsChange}
          />
        </div>

        {fieldsErrors.body && (
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
              'is-loading': isCommentPosting,
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
            onClick={clearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
