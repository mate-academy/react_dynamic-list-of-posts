import classNames from 'classnames';
import React, { useState } from 'react';

interface Props {
  loadingComments: boolean;
  createComment: (
    userName: string,
    title: string,
    userEmail: string,
  ) => Promise<void>;
}

export const NewCommentForm: React.FC<Props> = ({
  loadingComments,
  createComment,
}) => {
  const [userNameError, setUserNameError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [titleErrorSpaces, setTitleErrorSpaces] = useState(false);
  const [userEmailError, setUserEmailError] = useState(false);

  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');

  const handleUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
    setUserNameError(false);
  };

  const handleUserEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setUserEmailError(false);
  };

  const handleTitle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
    setTitleErrorSpaces(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setUserNameError(!userName);
    setTitleError(!title);
    setUserEmailError(!email);
    setTitleErrorSpaces(!title);

    if (!userName || !title || !email) {
      return;
    }

    if (title.trim()) {
      createComment(userName, title, email);
      setTitle('');
    } else {
      setTitleErrorSpaces(true);
    }
  };

  const reset = () => {
    setTitle('');
    setEmail('');
    setUserName('');
    setUserNameError(false);
    setTitleError(false);
    setUserEmailError(false);
    setTitleErrorSpaces(false);
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
              'is-danger': userNameError,
            })}
            value={userName}
            onChange={handleUserName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {userNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {userNameError && (
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
              'is-danger': userEmailError,
            })}
            value={email}
            onChange={handleUserEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {userEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {userEmailError && (
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
              'is-danger': titleError,
            })}
            value={title}
            onChange={handleTitle}
          />
        </div>

        {titleError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
        {titleErrorSpaces && !titleError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            please enter valid text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': loadingComments,
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
            onClick={reset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
