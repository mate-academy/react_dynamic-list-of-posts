import React, { useState } from 'react';
import { CommentData } from '../types/Comment';
import classNames from 'classnames';

type Props = {
  onSubmitForm: (comment: CommentData) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({ onSubmitForm }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [isErrorNameField, setIsErrorNameField] = useState(false);
  const [isErrorEmailField, setIsErrorEmailField] = useState(false);
  const [isErrorTextField, setIsErrorTextField] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedText = text.trim();

    let isError = false;

    if (!trimmedName) {
      setIsErrorNameField(true);
      isError = true;
    }

    if (!trimmedEmail) {
      setIsErrorEmailField(true);
      isError = true;
    }

    if (!trimmedText) {
      setIsErrorTextField(true);
      isError = true;
    }

    if (isError) {
      return null;
    }

    const newComment: CommentData = {
      name: trimmedName,
      email: trimmedEmail,
      body: trimmedText,
    };

    return newComment;
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setText('');
    setIsErrorNameField(false);
    setIsErrorEmailField(false);
    setIsErrorTextField(false);
  };

  const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearForm();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newComment = validateForm();

    if (!newComment) {
      return;
    }

    setIsLoading(true);
    onSubmitForm(newComment)
      .then(() => setText(''))
      .finally(() => setIsLoading(false));
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={event => handleSubmit(event)}
      onReset={event => handleReset(event)}
    >
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
            className={classNames('input', { 'is-danger': isErrorNameField })}
            value={name}
            onChange={event => {
              setName(event.target.value);
              setIsErrorNameField(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isErrorNameField && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isErrorNameField && (
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
            className={classNames('input', { 'is-danger': isErrorEmailField })}
            value={email}
            onChange={event => {
              setEmail(event.target.value);
              setIsErrorEmailField(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isErrorEmailField && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isErrorEmailField && (
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
            className={classNames('input', { 'is-danger': isErrorTextField })}
            value={text}
            onChange={event => {
              setText(event.target.value);
              setIsErrorTextField(false);
            }}
          />
        </div>

        {isErrorTextField && (
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
            disabled={isLoading}
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
