import React from 'react';
import { Input } from './Input/Input';
import { ErrorFieldForm } from './ErrorFieldForm/ErrorFieldForm';
import { Fields } from '../types/Fields';
import classNames from 'classnames';

type Props = {
  name: string;
  email: string;
  commentText: string;
  invalidFields: Fields[];
  errorMessage: string;
  loading: string;
  handleChangeName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeTextarea: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  clearFormFields: () => void;
};

export const NewCommentForm: React.FC<Props> = ({
  loading,
  name,
  email,
  commentText,
  invalidFields,
  handleChangeName,
  handleChangeEmail,
  handleChangeTextarea,
  handleSubmit,
  clearFormFields,
}) => {
  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <Input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={
              invalidFields.includes('name') ? 'input is-danger' : 'input'
            }
            value={name}
            handleChange={handleChangeName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {invalidFields.includes('name') && <ErrorFieldForm />}
        </div>

        {invalidFields.includes('name') && (
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
          <Input
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={
              invalidFields.includes('email') ? 'input is-danger' : 'input'
            }
            value={email}
            handleChange={handleChangeEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {invalidFields.includes('email') && <ErrorFieldForm />}
        </div>

        {invalidFields.includes('email') && (
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
            className={
              invalidFields.includes('textarea')
                ? 'textarea is-danger'
                : 'textarea'
            }
            value={commentText}
            onChange={handleChangeTextarea}
          />
        </div>

        {invalidFields.includes('textarea') && (
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
              'is-loading': loading === 'addComment',
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            onClick={clearFormFields}
            type="reset"
            className="button is-link is-light"
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
