import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { GlobalContext } from '../GlobalContetxt';
import * as commentsService from '../api/comments';

export const NewCommentForm: React.FC = () => {
  const {
    comments,
    postId,
    setComments,
    setIsErrorComments,
  } = useContext(GlobalContext);
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [bodyValue, setBodyValue] = useState('');
  const [isNameError, setIsNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isBodyError, setIsBodyError] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const handleChangeName = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNameValue(event.target.value);
    setIsNameError(false);
  };

  const handleChangeEmail = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEmailValue(event.target.value);
    setIsEmailError(false);
  };

  const handleChangeBody = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setBodyValue(event.target.value);
    setIsBodyError(false);
  };

  const handleClear = () => {
    setNameValue('');
    setEmailValue('');
    setBodyValue('');
    setIsNameError(false);
    setIsEmailError(false);
    setIsBodyError(false);
  };

  const handleAddComment = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    setIsNameError(!nameValue);
    setIsEmailError(!emailValue);
    setIsBodyError(!bodyValue);
    setIsLoadingButton(true);

    if (!nameValue.trim() || !emailValue.trim() || !bodyValue.trim()) {
      setIsLoadingButton(false);

      return;
    }

    commentsService.creatComment({
      postId,
      name: nameValue,
      email: emailValue,
      body: bodyValue,
    })
      .then((newComment) => {
        setComments([...comments, newComment]);
        setBodyValue('');
      })
      .catch(() => {
        setIsErrorComments(true);
        setComments([]);
      })
      .finally(() => setIsLoadingButton(false));
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
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames(
              'input',
              { 'is-danger': isNameError },
            )}
            value={nameValue}
            onChange={handleChangeName}
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
            className={classNames(
              'input',
              { 'is-danger': isEmailError },
            )}
            value={emailValue}
            onChange={handleChangeEmail}
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
            className={classNames(
              'textarea',
              { 'is-danger': isBodyError },
            )}
            value={bodyValue}
            onChange={handleChangeBody}
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
            className={classNames(
              'button',
              'is-link',
              { 'is-loading': isLoadingButton },
            )}
            onClick={handleAddComment}
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
