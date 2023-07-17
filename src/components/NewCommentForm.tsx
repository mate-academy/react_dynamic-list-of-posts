import React, { useState } from 'react';
import classNames from 'classnames';
import { CommentData } from '../types/Comment';

type Props = {
  addComment: ({ name, email, body }: CommentData) => Promise<void>;
  postId: number | undefined;
  loadingComment: boolean;
};

export const NewCommentForm: React.FC<Props> = ({
  addComment,
  postId,
  loadingComment,
}) => {
  const [inputName, setInputName] = useState('');
  const [inputNameError, setInputNameError] = useState(false);

  const [inputEmail, setInputEmail] = useState('');
  const [inputEmailError, setInputEmailError] = useState(false);

  const [inputComment, setInputComment] = useState('');
  const [inputCommentError, setInputCommentError] = useState(false);

  const changeInputName = (value: string) => {
    setInputName(value.trim());
    setInputNameError(false);
  };

  const changeInputEmail = (value: string) => {
    setInputEmail(value.trim());
    setInputEmailError(false);
  };

  const changeInputComment = (value: string) => {
    setInputComment(value.trim());
    setInputCommentError(false);
  };

  const submitData = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    name: string,
    email: string,
    body: string,
  ) => {
    event.preventDefault();

    if (!inputName) {
      setInputNameError(true);
    }

    if (!inputEmail) {
      setInputEmailError(true);
    }

    if (!inputComment) {
      setInputCommentError(true);
    }

    if (inputName && inputEmail && inputComment && postId) {
      addComment({
        postId, name, email, body,
      });
    }

    setInputComment('');
  };

  const clearData = () => {
    setInputName('');
    setInputEmail('');
    setInputComment('');
    setInputNameError(false);
    setInputEmailError(false);
    setInputCommentError(false);
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
            className={classNames('input', { 'is-danger': inputNameError })}
            value={inputName}
            onChange={(event) => changeInputName(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {inputNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {inputNameError && (
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
            className={classNames('input', { 'is-danger': inputEmailError })}
            value={inputEmail}
            onChange={(event) => changeInputEmail(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {inputEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {inputEmailError && (
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
            className={classNames('textarea',
              { 'is-danger': inputCommentError })}
            value={inputComment}
            onChange={(event) => changeInputComment(event.target.value)}
          />
        </div>

        {inputCommentError && (
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
              'button', 'is-link', { 'is-loading': loadingComment },
            )}
            onClick={(event) => submitData(
              event,
              inputName,
              inputEmail,
              inputComment,
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
            onClick={clearData}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
