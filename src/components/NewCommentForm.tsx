import classNames from 'classnames';
import React, { useState } from 'react';
import { CommentData } from '../types/Comment';

type Props = {
  buttonLoader: boolean;
  addFunction: (newComment: CommentData) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({
  buttonLoader,
  addFunction,
}) => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [text, setText] = useState('');
  const [textError, setTextError] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setNameError(false);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError(false);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    setTextError(false);
  };

  const checkQuery = (
    query: string,
    setQuery: (query: string) => void,
    error: (value: boolean) => void,
  ) => {
    const normalizedQuery = query.trim();
    const isError = normalizedQuery.length === 0 || !query;

    error(isError);
    setQuery(normalizedQuery);

    return isError;
  };

  const onSubmit = (event: React.FormEvent | React.MouseEvent) => {
    event.preventDefault();

    const isNameError = checkQuery(name, setName, setNameError);
    const isEmailError = checkQuery(email, setEmail, setEmailError);
    const isTextError = checkQuery(text, setText, setTextError);

    if (isNameError || isEmailError || isTextError) {
      return;
    }

    const newComment = addFunction({ name, email, body: text });

    if (newComment instanceof Promise) {
      newComment.then(() => setText(''));
    }
  };

  const clearFunction = () => {
    setEmail('');
    setEmailError(false);
    setName('');
    setNameError(false);
    setText('');
    setTextError(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={event => onSubmit(event)}>
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
            value={name}
            onChange={handleNameChange}
            className={classNames('input', { 'is-danger': nameError })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {nameError && (
            <>
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>

              <p className="help is-danger" data-cy="ErrorMessage">
                Name is required
              </p>
            </>
          )}
        </div>
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
            onChange={handleEmailChange}
            value={email}
            className={classNames('input', { 'is-danger': emailError })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && (
            <>
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>

              <p className="help is-danger" data-cy="ErrorMessage">
                Email is required
              </p>
            </>
          )}
        </div>
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
            onChange={handleTextChange}
            value={text}
            className={classNames('input', { 'is-danger': textError })}
          />
        </div>

        {textError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            onClick={event => {
              onSubmit(event);
            }}
            className={classNames('button is-link', {
              'is-loading': buttonLoader,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            onClick={clearFunction}
            className="button is-link is-light"
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
