import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  handleCommentAdd: (author: string, email: string, comment: string) => void,
  isCommentAdding: boolean,
};

export const NewCommentForm: React.FC<Props> = ({
  handleCommentAdd,
  isCommentAdding,
}) => {
  const [author, setAuthor] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const [isAuthorError, setAuthorError] = useState(false);
  const [isEmailError, setEmailError] = useState(false);
  const [isCommentError, setCommentError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (author && email && comment) {
      handleCommentAdd(author, email, comment);
      setComment('');
    }

    if (!author) {
      setAuthorError(true);
    }

    if (!email) {
      setEmailError(true);
    }

    if (!comment) {
      setCommentError(true);
    }
  };

  const handleClear = () => {
    setAuthorError(false);
    setEmailError(false);
    setCommentError(false);
    setAuthor('');
    setEmail('');
    setComment('');
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
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
            className={classNames('input', {
              'is-danger': isAuthorError,
            })}
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
              setAuthorError(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isAuthorError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isAuthorError && (
          <p
            className="help is-danger"
            data-cy="ErrorMessage"
          >
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
            className={classNames('input', {
              'is-danger': isEmailError,
            })}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(false);
            }}
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
          <p
            className="help is-danger"
            data-cy="ErrorMessage"
          >
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
            className={classNames('textarea', {
              'is-danger': isCommentError,
            })}
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              setCommentError(false);
            }}
          />
        </div>

        {isCommentError && (
          <p
            className="help is-danger"
            data-cy="ErrorMessage"
          >
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': isCommentAdding,
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
            onClick={() => {
              handleClear();
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
