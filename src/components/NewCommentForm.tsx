import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  postId: number | undefined;
  addComment: (comment: {}) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, addComment }) => {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setemailValue] = useState('');
  const [commentText, setCommenttext] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [commentError, setCommentError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputs = (value: string, name: string) => {
    switch (name) {
      case 'name':
        setNameError(false);
        setNameValue(value);
        break;
      case 'email':
        setEmailError(false);
        setemailValue(value);
        break;
      case 'body':
        setCommentError(false);
        setCommenttext(value);
        break;
      default:
        break;
    }
  };

  function checkIsEmptyInputs() {
    let isError = false;

    if (!nameValue) {
      setNameError(true);
      isError = true;
    }

    if (!emailValue) {
      setEmailError(true);
      isError = true;
    }

    if (!commentText) {
      setCommentError(true);
      isError = true;
    }

    return isError;
  }

  const submitForm = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setIsLoading(true);

    if (checkIsEmptyInputs()) {
      setIsLoading(false);

      return;
    }

    if (!postId) {
      return;
    }

    const data = {
      postId,
      name: nameValue,
      email: emailValue,
      body: commentText,
    };

    await addComment(data);

    setCommenttext('');

    setIsLoading(false);
  };

  const clearButton = () => {
    setNameValue('');
    setemailValue('');
    setCommenttext('');
    setNameError(false);
    setEmailError(false);
    setCommentError(false);
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
              { 'is-danger': nameError },
            )}
            value={nameValue}
            onChange={(e) => {
              handleInputs(e.target.value, e.target.name);
            }}
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
            className={classNames(
              'input',
              { 'is-danger': emailError },
            )}
            value={emailValue}
            onChange={(e) => {
              handleInputs(e.target.value, e.target.name);
            }}
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
            className={classNames(
              'textarea',
              { 'is-danger': commentError },
            )}
            value={commentText}
            onChange={(e) => {
              handleInputs(e.target.value, e.target.name);
            }}
          />
        </div>

        {commentError && (
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
              { 'is-loading': isLoading },
            )}
            onClick={submitForm}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={clearButton}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
