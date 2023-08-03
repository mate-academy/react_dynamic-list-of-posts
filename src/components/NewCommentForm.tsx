import React, { useState } from 'react';
import classNames from 'classnames';
import { Comment } from '../types/Comment';

type Props = {
  addComment: ({
    postId,
    name,
    email,
    body,
  }: Omit<Comment, 'id'>) => Promise<void>;
  postId: number;
};

export const NewCommentForm: React.FC<Props> = ({
  addComment,
  postId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [textError, setTextError] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setNameError(false);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError(false);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    setTextError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nameValidate = !name.trim;
    const emailValidate = !email.trim;
    const textValidate = !text.trim;

    if (nameValidate) {
      setNameError(true);
    }

    if (emailValidate) {
      setEmailError(true);
    }

    if (textValidate) {
      setTextError(true);
    }

    if (nameValidate || emailValidate || textValidate) {
      return;
    }

    setIsLoading(true);

    addComment({
      postId,
      name,
      email,
      body: text,
    })
      .finally(() => {
        setIsLoading(false);
        setText('');
      });
  };

  const clearErrors = () => {
    setEmailError(false);
    setNameError(false);
    setTextError(false);
  };

  const handleClear = () => {
    clearErrors();
    setName('');
    setEmail('');
    setText('');
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={(event) => handleSubmit(event)}>
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
            className={classNames(
              'input',
              { 'is-danger': nameError },
            )}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameError && (
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
            value={email}
            onChange={handleEmailChange}
            className={classNames(
              'input',
              { 'is-danger': emailError },
            )}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailError && (
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
            value={text}
            onChange={handleBodyChange}
            className={classNames(
              'textarea',
              { 'is-danger': textError },
            )}
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
            className={classNames(
              'button',
              'is-link',
              { 'is-loading': isLoading },
            )}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
