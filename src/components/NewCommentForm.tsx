import React, { useState } from 'react';
import classNames from 'classnames';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

interface Props {
  postId: number;
  onCommentAdd: (comment: Comment) => void;
}

export const NewCommentForm: React.FC<Props> = ({ postId, onCommentAdd }) => {
  const [isName, setIsName] = useState('');
  const [isEmail, setIsEmail] = useState('');
  const [isBody, setIsBody] = useState('');
  const [isErrorName, setIsErrorName] = useState(false);
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorBody, setIsErrorBody] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={event => {
        event.preventDefault();

        if (!isName) {
          setIsErrorName(true);
        }

        if (!isEmail) {
          setIsErrorEmail(true);
        }

        if (!isBody) {
          setIsErrorBody(true);
        }

        if (isName && isEmail && isBody) {
          setIsLoading(true);
        }

        client
          /* eslint-disable @typescript-eslint/indent, prettier/prettier, max-len */
          .post<Comment>('/comments', {
            postId,
            name: isName,
            email: isEmail,
            body: isBody,
          })
          /* eslint-enable @typescript-eslint/indent, prettier/prettier, max-len */
          .then(result => {
            onCommentAdd(result);
            setIsBody('');
            setIsLoading(false);
          })

          .catch(() => {
            setIsLoading(false);
          });
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
              'is-danger': isErrorName,
            })}
            value={isName}
            onChange={event => {
              setIsName(event.target.value);
              setIsErrorName(false);
            }}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isErrorName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isErrorName && (
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
            className={classNames('input', {
              'is-danger': isErrorEmail,
            })}
            value={isEmail}
            onChange={event => {
              setIsEmail(event.target.value);
              setIsErrorEmail(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isErrorEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isErrorEmail && (
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
            className={classNames('textarea', {
              'is-danger': isErrorBody,
            })}
            value={isBody}
            onChange={event => {
              setIsBody(event.target.value);
              setIsErrorBody(false);
            }}
          />
        </div>

        {isErrorBody && (
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
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            onClick={event => {
              event.preventDefault();

              setIsName('');
              setIsEmail('');
              setIsBody('');

              setIsErrorName(false);

              setIsErrorEmail(false);
              setIsErrorBody(false);
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
