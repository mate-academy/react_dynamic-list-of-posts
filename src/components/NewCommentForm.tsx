import React, { useState } from 'react';
import cn from 'classnames';
import { CommentData } from '../types/Comment';

type Props = {
  createComment: (comment: CommentData) => void,
  isLoading: boolean,
};

export const NewCommentForm: React.FC<Props> = ({
  createComment,
  isLoading,
}) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [isNameError, setIsNameError] = useState<boolean>(false);
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [isBodyError, setIsBodyError] = useState<boolean>(false);

  const handleNameChanging = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setIsNameError(false);
  };

  const handleEmailChanging = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setIsEmailError(false);
  };

  const handleBodyChanging = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setBody(event.target.value);
    setIsBodyError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimedName = name.trim();
    const trimedEmail = email.trim();
    const trimedBody = body.trim();

    if (!trimedName) {
      setIsNameError(true);
    }

    if (!trimedEmail) {
      setIsEmailError(true);
    }

    if (!trimedBody) {
      setIsBodyError(true);
    }

    if (trimedName && trimedEmail && trimedBody) {
      setBody('');

      createComment({
        name: trimedName,
        email: trimedEmail,
        body: trimedBody,
      });
    }
  };

  const handleClear = () => {
    setName('');
    setIsNameError(false);
    setEmail('');
    setIsEmailError(false);
    setBody('');
    setIsBodyError(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
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
            className={cn(
              'input',
              { 'is-danger': isNameError },
            )}
            value={name}
            onChange={handleNameChanging}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isNameError && (
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
            className={cn(
              'input',
              { 'is-danger': isEmailError },
            )}
            value={email}
            onChange={handleEmailChanging}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isEmailError && (
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
            className={cn(
              'input',
              { 'is-danger': isBodyError },
            )}
            value={body}
            onChange={handleBodyChanging}
          />
        </div>

        {isBodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn(
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
