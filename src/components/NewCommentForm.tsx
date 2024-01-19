import React, { useState } from 'react';
import cn from 'classnames';

import { CommentData } from '../types/Comment';

type Props = {
  handleCreateComment: (comment: CommentData) => void;
  isCommentLoading: boolean;
};

export const NewCommentForm: React.FC<Props> = ({
  handleCreateComment,
  isCommentLoading,
}) => {
  const [comment, setComment] = useState<CommentData>({
    name: '',
    body: '',
    email: '',
  });

  const [isNameError, setIsNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isBodyError, setIsBodyError] = useState(false);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsNameError(false);
    setComment(prevComment => ({
      ...prevComment,
      name: e.target.value,
    }));
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEmailError(false);
    setComment(prevComment => ({
      ...prevComment,
      email: e.target.value,
    }));
  };

  const handleChangeBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsBodyError(false);
    setComment(prevComment => ({
      ...prevComment,
      body: e.target.value,
    }));
  };

  const handleClear = () => {
    setComment({
      name: '',
      body: '',
      email: '',
    });

    setIsNameError(false);
    setIsEmailError(false);
    setIsBodyError(false);
  };

  const clearAfterAdd = () => {
    setComment(prevComment => ({
      ...prevComment,
      body: '',
    }));
  };

  const onAddComment = (e: React.FormEvent) => {
    e.preventDefault();

    const isNameValid = comment.name.trim();
    const isEmailValid = comment.email.trim();
    const isBodyValid = comment.body.trim();

    const isAllInfomationValid = (
      isNameValid
      && isEmailValid
      && isBodyValid
    );

    if (!isAllInfomationValid) {
      if (!isNameValid) {
        setIsNameError(true);
      }

      if (!isEmailValid) {
        setIsEmailError(true);
      }

      if (!isBodyValid) {
        setIsBodyError(true);
      }
    } else {
      handleCreateComment(comment);
      clearAfterAdd();
    }
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={e => onAddComment(e)}
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
            className={cn('input', { 'is-danger': isNameError })}
            value={comment.name}
            onChange={e => handleChangeName(e)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            {isNameError && (
              <i className="fas fa-exclamation-triangle" />
            )}
          </span>
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
            className={cn('input', { 'is-danger': isEmailError })}
            value={comment.email}
            onChange={e => handleChangeEmail(e)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            {isEmailError && (
              <i className="fas fa-exclamation-triangle" />
            )}
          </span>
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
            className={cn('textarea', { 'is-danger': isBodyError })}
            value={comment.body}
            onChange={e => handleChangeBody(e)}
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
            className={cn(
              'button',
              'is-link',
              { 'is-loading': isCommentLoading },
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
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
