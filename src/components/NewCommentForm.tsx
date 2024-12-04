/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { postComment } from '../api/ClientFunctions';
import { Comment } from '../types/Comment';

interface Props {
  postId: number;
  commentsError: boolean;
  setCommentsError: (value: boolean) => void;
  setDoesFormExist: (value: boolean) => void;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export const NewCommentForm: React.FC<Props> = ({
  postId,
  commentsError,
  setCommentsError,
  setDoesFormExist,
  setComments,
}) => {
  // #region states

  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isCommentValid, setIsCommentValid] = useState(true);
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [commentValue, setCommentValue] = useState('');
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  // #endregion
  // #region handlers

  const clearHandler = () => {
    setNameValue('');
    setEmailValue('');
    setCommentValue('');
    setIsNameValid(true);
    setIsEmailValid(true);
    setIsCommentValid(true);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const IS_VALID =
      nameValue.length > 0 && emailValue.length > 0 && commentValue.length > 0;

    if (nameValue.length === 0) {
      setIsNameValid(false);
    }

    if (emailValue.length === 0) {
      setIsEmailValid(false);
    }

    if (commentValue.length === 0) {
      setIsCommentValid(false);
    }

    if (!IS_VALID) {
      return;
    }

    setIsSubmitLoading(true);

    const comment = {
      postId: postId,
      name: nameValue,
      email: emailValue,
      body: commentValue,
    };

    if (commentsError) {
      setCommentsError(false);
    }

    postComment(comment)
      .then(_comment => {
        setComments(currentComments => [...currentComments, _comment]);
        setCommentValue('');
      })
      .catch(() => {
        setCommentsError(true);
        setDoesFormExist(false);
      })
      .finally(() => setIsSubmitLoading(false));
  };

  // #endregion
  // #region useEffects

  useEffect(() => {
    if (!isNameValid) {
      setIsNameValid(true);
    }
  }, [nameValue]);

  useEffect(() => {
    if (!isEmailValid) {
      setIsEmailValid(true);
    }
  }, [emailValue]);

  useEffect(() => {
    if (!isCommentValid) {
      setIsCommentValid(true);
    }
  }, [commentValue]);

  // #endregion

  return (
    <form data-cy="NewCommentForm" onSubmit={onSubmit}>
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
            value={nameValue}
            onChange={event => setNameValue(event.target.value)}
            className={classNames('input', {
              'is-danger': !isNameValid,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!isNameValid && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!isNameValid && (
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
            value={emailValue}
            onChange={event => setEmailValue(event.target.value)}
            className={classNames('input', {
              'is-danger': !isEmailValid,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {!isEmailValid && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!isEmailValid && (
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
            value={commentValue}
            onChange={event => setCommentValue(event.target.value)}
            className={classNames('textarea', {
              'is-danger': !isCommentValid,
            })}
          />
        </div>

        {!isCommentValid && (
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
              'is-loading': isSubmitLoading,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            onClick={clearHandler}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
