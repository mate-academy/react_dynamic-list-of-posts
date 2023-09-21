import React, { useState } from 'react';
import classNames from 'classnames';

type Props = {
  selectedPostId: number;
  handleAddComment: (
    postId: number,
    name: string,
    email: string,
    body: string,
  ) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  handleAddComment,
}) => {
  const [name, setName] = useState('');
  const [isNameError, setIsNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);
  const [body, setBody] = useState('');
  const [isBodyError, setIsBodyError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim().length) {
      setIsNameError(true);
    } else {
      setIsNameError(false);
    }

    if (!email.trim().length) {
      setIsEmailError(true);
    } else {
      setIsEmailError(false);
    }

    if (!body.length) {
      setIsBodyError(true);
    } else {
      setIsBodyError(false);
    }

    if (name.trim().length
      && email.trim().length
      && body.trim().length) {
      try {
        setIsLoading(true);

        await handleAddComment(selectedPostId, name, email, body);
        setBody('');
      } catch {
        throw new Error();
      } finally {
        setIsLoading(false);
      }
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
            className={classNames('input', {
              'is-danger': isNameError,
            })}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setIsNameError(false);
            }}
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
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            value={email}
            className={classNames('input', {
              'is-danger': isEmailError,
            })}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsNameError(false);
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
              'is-danger': isBodyError,
            })}
            onChange={(e) => {
              setBody(e.target.value);
              setIsBodyError(false);
            }}
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
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
