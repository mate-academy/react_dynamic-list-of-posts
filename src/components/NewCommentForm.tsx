import React from 'react';
import { Form } from '../types/Form';

type Props = {
  form: Form;
  formNameError: boolean;
  formEmailError: boolean;
  formBodyError: boolean;
  isCommentLoading: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
};

export const NewCommentForm: React.FC<Props> = ({
  form,
  formNameError,
  formEmailError,
  formBodyError,
  isCommentLoading,
  onChange,
  onSubmit,
  onReset,
}) => {
  return (
    <form data-cy="NewCommentForm" onSubmit={onSubmit} onReset={onReset}>
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
            className={`input ${formNameError ? 'is-danger' : ''}`}
            value={form.name}
            onChange={onChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {formNameError ? (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          ) : (
            ''
          )}
        </div>

        {formNameError ? (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        ) : (
          ''
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
            className={`input ${formEmailError ? 'is-danger' : ''}`}
            value={form.email}
            onChange={onChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {formEmailError ? (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          ) : (
            ''
          )}
        </div>

        {formEmailError ? (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        ) : (
          ''
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
            className={`textarea ${formBodyError ? 'is-danger' : ''}`}
            value={form.body}
            onChange={onChange}
          />
        </div>

        {formBodyError ? (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        ) : (
          ''
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={`button is-link ${isCommentLoading ? 'is-loading' : ''}`}
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
