import React from 'react';
import classNames from 'classnames';

import { FormErrors } from '../types/enums/Errors';
import { FormField } from '../types/FormField';

type Props = {
  name: FormField,
  email: FormField,
  body: FormField,
  isFormLoading: boolean,
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onTextAreaChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
  onSubmit: (event: React.FormEvent) => void,
  onReset: (event: React.FormEvent) => void,
};

export const NewCommentForm: React.FC<Props> = ({
  name,
  email,
  body,
  isFormLoading,
  onNameChange,
  onTextAreaChange,
  onSubmit,
  onReset,
}) => {
  const validateError = (value: FormField) => {
    return classNames(
      'input',
      {
        'is-danger': value.error,
      },
    );
  };

  const errorTriangle = (
    <span
      className="icon is-small is-right has-text-danger"
      data-cy="ErrorIcon"
    >
      <i className="fas fa-exclamation-triangle" />
    </span>
  );

  const errorMessage = (message: string) => (
    <p className="help is-danger" data-cy="ErrorMessage">
      {message}
    </p>
  );

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
            value={name.content}
            className={validateError(name)}
            onChange={onNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {name.error && errorTriangle}
        </div>

        {name.error && errorMessage(FormErrors.Name)}
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
            value={email.content}
            className={validateError(email)}
            onChange={onNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {email.error && errorTriangle}
        </div>

        {email.error && errorMessage(FormErrors.Email)}

      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            value={body.content}
            placeholder="Type comment here"
            className={validateError(body)}
            onChange={onTextAreaChange}
          />
        </div>

        {body.error && errorMessage(FormErrors.TextArea)}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
              'button is-link',
              {
                'is-loading': isFormLoading,
              },
            )}
            onClick={onSubmit}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={onReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
