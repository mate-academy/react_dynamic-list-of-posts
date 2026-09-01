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
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    body: false,
  });

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={async event => {
        event.preventDefault();

        const hasErrors = {
          name: !isName.trim(),
          email: !isEmail.trim(),
          body: !isBody.trim(),
        };

        setErrors(hasErrors);

        if (hasErrors.name || hasErrors.email || hasErrors.body) {
          return;
        }

        setIsError(false);
        setIsLoading(true);

        try {
          const result = await client.post<Comment>('/comments', {
            postId,
            name: isName,
            email: isEmail,
            body: isBody,
          });

          onCommentAdd(result);
          setIsBody('');
        } catch {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
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
              'is-danger': errors.name,
            })}
            value={isName}
            onChange={event => {
              setIsName(event.target.value);
              setErrors(prev => ({
                ...prev,
                name: false,
              }));
            }}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.name && (
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
              'is-danger': errors.email,
            })}
            value={isEmail}
            onChange={event => {
              setIsEmail(event.target.value);
              setErrors(prev => ({
                ...prev,
                email: false,
              }));
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.email && (
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
              'is-danger': errors.body,
            })}
            value={isBody}
            onChange={event => {
              setIsBody(event.target.value);
              setErrors(prev => ({
                ...prev,
                body: false,
              }));
            }}
          />
        </div>

        {errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      {isError && (
        <div className="notification is-danger">Something went wrong!</div>
      )}

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
              setIsError(false);

              setErrors({
                name: false,
                email: false,
                body: false,
              });
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
