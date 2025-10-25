import cn from 'classnames';
import React, { useState } from 'react';
import { CommentData } from '../types/Comment';

type Props = {
  loaderForm: boolean;
  onSubmit: (comment: CommentData) => void;
};

export const NewCommentForm: React.FC<Props> = ({ onSubmit, loaderForm }) => {
  const [inputName, setInputName] = useState('');
  const [errorName, setErrorName] = useState(false);

  const [inputEmail, setInputEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);

  const [inputBody, setInputBody] = useState('');
  const [errorBody, setErrorBody] = useState(false);

  const handleNameValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setErrorName(false);
    setInputName(newValue);
  };

  const handleEmailValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setErrorEmail(false);
    setInputEmail(newValue);
  };

  const handleBodyValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;

    setErrorBody(false);
    setInputBody(newValue);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isEmailEmpty = !inputEmail.trim();
    const isNameEmpty = !inputName.trim();
    const isBodyEmpty = !inputBody.trim();

    if (isNameEmpty || isEmailEmpty || isBodyEmpty) {
      setErrorName(isNameEmpty);
      setErrorEmail(isEmailEmpty);
      setErrorBody(isBodyEmpty);

      return;
    }

    onSubmit({
      name: inputName,
      email: inputEmail,
      body: inputBody,
    });

    setInputBody('');
  };

  const onReset = () => {
    setErrorBody(false);
    setErrorEmail(false);
    setErrorName(false);

    setInputBody('');
    setInputEmail('');
    setInputName('');
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={event => handleSubmit(event)}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={inputName}
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', { 'is-danger': errorName })}
            onChange={handleNameValue}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errorName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorName && (
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
            value={inputEmail}
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', { 'is-danger': errorEmail })}
            onChange={handleEmailValue}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errorEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorEmail && (
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
            value={inputBody}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={cn('textarea', { 'is-danger': errorBody })}
            onChange={handleBodyValue}
          />
        </div>

        {errorBody && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', {
              'is-loading': loaderForm,
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
            onClick={onReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
