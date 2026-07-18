import React, { useCallback, useState } from 'react';
import { Comment } from '../types/Comment';
import classNames from 'classnames';

interface Props {
  handleAddComment: (comment: Omit<Comment, 'id' | 'postId'>) => Promise<void>;
}

export const NewCommentForm: React.FC<Props> = ({ handleAddComment }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [body, setBody] = useState('');
  const [bodyError, setBodyError] = useState(false);

  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNameError(false);
      setName(event.target.value);
    },
    [],
  );

  const handleEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmailError(false);
      setEmail(event.target.value);
    },
    [],
  );

  const handleTextChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setBodyError(false);
      setBody(event.target.value);
    },
    [],
  );

  const handleReset = useCallback(() => {
    setNameError(false);
    setName('');
    setEmailError(false);
    setEmail('');
    setBodyError(false);
    setBody('');
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const isNameValid = name.trim() !== '';
    const isEmailValid = email.trim() !== '';
    const isBodyValid = body.trim() !== '';

    setNameError(!isNameValid);
    setEmailError(!isEmailValid);
    setBodyError(!isBodyValid);

    if (!isNameValid || !isEmailValid || !isBodyValid) {
      return;
    }

    setIsLoading(true);

    const comment: Omit<Comment, 'id' | 'postId'> = {
      name,
      email,
      body,
    };

    await handleAddComment(comment);

    setIsLoading(false);
    setBody('');
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
            className={classNames('input', { 'is-danger': nameError })}
            value={name}
            onChange={handleNameChange}
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
            className={classNames('input', { 'is-danger': emailError })}
            value={email}
            onChange={handleEmailChange}
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
            className={classNames('input', { 'is-danger': bodyError })}
            value={body}
            onChange={handleTextChange}
          />
        </div>

        {bodyError && (
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
              'is-loading': isLoading,
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
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
