import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  handleAddComment: (
    name: string,
    email: string,
    body: string,
  ) => void,
  selectedPost: Post | null,
  setIsButtonNotVisible: (isVisible: boolean) => void,
};

export const NewCommentForm: React.FC<Props> = ({
  handleAddComment,
  selectedPost,
  setIsButtonNotVisible,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [hasNameError, setHasNameError] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasCommentTextError, setHasCommentTextError] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim().length) {
      setHasNameError(true);
    }

    if (!email.trim().length) {
      setHasEmailError(true);
    }

    if (!commentText.length) {
      setHasCommentTextError(true);
    }

    if (hasNameError || hasEmailError || hasCommentTextError) {
      return;
    }

    setIsCommentLoading(true);

    if (name.trim().length && email.trim().length && commentText) {
      handleAddComment(name, email, commentText);
      setIsCommentLoading(false);
      setCommentText('');
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasNameError(false);

    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasEmailError(false);

    setEmail(e.target.value);
  };

  const handleCommentTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setHasCommentTextError(false);

    setCommentText(e.target.value);
  };

  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      setIsButtonNotVisible(false);
      setName('');
      setEmail('');
    }

    didMount.current = true;
  }, [selectedPost]);

  const handleClearButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setName('');
    setEmail('');
    setCommentText('');
    setHasCommentTextError(false);
    setHasNameError(false);
    setHasEmailError(false);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleFormSubmit}
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
            className={classNames(
              'input',
              { 'is-danger': hasNameError },
            )}
            value={name}
            onChange={handleNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >

              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasNameError && (
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
            className={classNames(
              'input',
              { 'is-danger': hasEmailError },
            )}
            value={email}
            onChange={handleEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasEmailError && (
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
            className={classNames(
              'textarea',
              { 'is-danger': hasCommentTextError },
            )}
            value={commentText}
            onChange={handleCommentTextChange}
          />
        </div>

        {hasCommentTextError && (
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
              'button is-link',
              { 'is-loading': isCommentLoading },
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
            onClick={handleClearButton}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
