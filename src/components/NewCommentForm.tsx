import classNames from 'classnames';
import React, { useState } from 'react';
import { Comment } from '../types/Comment';

type Props = {
  addComment: (a: Comment) => Promise<void>;
  postId: number;
  loadingAddNewComment: boolean;
};

export const NewCommentForm: React.FC<Props> = ({
  addComment,
  postId,
  loadingAddNewComment,
}) => {
  const [name, setName] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const [body, setBody] = useState('');
  const [bodyError, setBodyError] = useState(false);

  const [isReset, setIsReset] = useState(false);

  function reset() {
    setBody('');
  }

  function resetAllFields() {
    setIsReset(true);
    setName('');
    setEmail('');
    setBody('');
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setTitleError(false);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError(false);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
    setBodyError(false);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedBody = body.trim();

    if (name.length === 0 || !trimmedName) {
      setTitleError(true);
    }

    if (email.length === 0 || !trimmedEmail) {
      setEmailError(true);
    }

    if (body.length === 0 || !trimmedBody) {
      setBodyError(true);
    }

    if (name.length > 0 && email.length > 0 && body.length > 0) {
      addComment({
        name,
        email,
        body,
        postId,
        id: 0,
      }).then(() => {
        reset();
      });
    }
  };

  return (
    <form data-cy="NewCommentForm">
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            value={name}
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': titleError && !isReset,
            })}
            onChange={handleNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {titleError && !isReset && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {titleError && !isReset && (
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
            value={email}
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': emailError && !isReset,
            })}
            onChange={handleEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && !isReset && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailError && !isReset && (
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
            value={body}
            placeholder="Type comment here"
            className={classNames('textarea', {
              'is-danger': bodyError && !isReset,
            })}
            onChange={handleBodyChange}
          />
        </div>

        {bodyError && !isReset && (
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
              'is-loading': loadingAddNewComment,
            })}
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={resetAllFields}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
