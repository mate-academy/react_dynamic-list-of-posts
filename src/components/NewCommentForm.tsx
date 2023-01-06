import classNames from 'classnames';
import React, { useState } from 'react';
import { CommentData } from '../types/Comment';

export type Props = {
  onChangeComment: React.Dispatch<React.SetStateAction<CommentData
  | null | undefined>>,
  isLoading: boolean,
};

export const NewCommentForm: React.FC<Props> = ({
  onChangeComment,
  isLoading,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const [hasErrorName, setHasErrorName] = useState(false);
  const [hasErrorEmail, setHasErrorEmail] = useState(false);
  const [hasErrorBody, setHasErrorBody] = useState(false);

  const onChangeName = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setHasErrorName(false);
    setName(ev.target.value);
  };

  const onChangeEmail = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setHasErrorEmail(false);
    setEmail(ev.target.value);
  };

  const onChangeBody = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHasErrorBody(false);
    setBody(ev.target.value);
  };

  // проблема что можно не ввести имейл

  const onClearForm = () => {
    setName('');
    setEmail('');
    setBody('');

    setHasErrorName(false);
    setHasErrorEmail(false);
    setHasErrorBody(false);
  };

  const onFormSubmit = (ev:
  React.MouseEvent<HTMLButtonElement,
  MouseEvent>) => {
    ev.preventDefault();

    if (!name) {
      setHasErrorName(true);
    }

    if (!email) {
      setHasErrorEmail(true);
    }

    if (!body) {
      setHasErrorBody(true);
    }

    if (name && email && body) {
      onChangeComment({
        name,
        email,
        body,
      });

      setBody('');

      setHasErrorName(false);
      setHasErrorEmail(false);
      setHasErrorBody(false);
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
            className={classNames('input', { 'is-danger': hasErrorName })}
            value={name}
            onChange={onChangeName}
            required
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasErrorName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasErrorName && (
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
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': hasErrorEmail })}
            value={email}
            onChange={onChangeEmail}
            required
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasErrorEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasErrorEmail && (
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
            className={classNames('textarea', { 'is-danger': hasErrorBody })}
            value={body}
            onChange={onChangeBody}
            required
          />
        </div>

        {hasErrorBody && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
              'button is-link', { 'is-loading': isLoading },
            )}
            onClick={(ev) => onFormSubmit(ev)}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={onClearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
