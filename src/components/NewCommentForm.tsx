import React, { useState } from 'react';
import classNames from 'classnames';

import { postComment } from '../api/data';

type Props = {
  postId: number
  getNewComments: (postId: number) => Promise<void>;
  commentError: (param: boolean) => void
};

export const NewCommentForm: React.FC<Props>
= React.memo(({ postId, getNewComments, commentError }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const [isNameError, setIsNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isCommentError, setIsCommentError] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    callback: (param: string) => void,
  ) => {
    const { value } = event.currentTarget;

    callback(value.trim());
  };

  const handleClear = () => {
    if (isEmailError) {
      setIsEmailError(false);
    }

    if (isCommentError) {
      setIsCommentError(false);
    }

    if (isNameError) {
      setIsNameError(false);
    }

    if (name) {
      setName('');
    }

    if (email) {
      setEmail('');
    }

    if (comment) {
      setComment('');
    }
  };

  const postCommentOnServer = async () => {
    if (!name) {
      setIsNameError(true);
    }

    if (!email) {
      setIsEmailError(true);
    }

    if (!comment) {
      setIsCommentError(true);
    }

    if (name && email && comment) {
      setIsCommentLoading(true);

      postComment(postId, name, email, comment)
        .then(() => getNewComments(postId))
        .catch(() => commentError(true))
        .finally(() => {
          setComment('');
          setIsCommentLoading(false);
        });
    }
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            value={name}
            onChange={(event) => {
              if (isNameError) {
                setIsNameError(false);
              }

              handleInput(event, setName);
            }}
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames(
              'input',
              { 'is-danger': isNameError },
            )}
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
            value={email}
            onChange={(event) => {
              if (isEmailError) {
                setIsEmailError(false);
              }

              handleInput(event, setEmail);
            }}
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames(
              'input',
              { 'is-danger': isEmailError },
            )}
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
            value={comment}
            onChange={(event) => {
              if (isCommentError) {
                setIsCommentError(false);
              }

              handleInput(event, setComment);
            }}
            placeholder="Type comment here"
            className={classNames(
              'textarea',
              { 'is-danger': isCommentError },
            )}
          />
        </div>

        {isCommentError && (
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
            onClick={postCommentOnServer}
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
});
