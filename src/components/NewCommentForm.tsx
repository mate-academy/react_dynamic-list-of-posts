import React, { useState } from 'react';
import classNames from 'classnames';
import { CommentData } from '../types/Comment';

type Props = {
  handleAddComment: (comment: CommentData) => void;
  isCommentLoading: boolean;
};

export const NewCommentForm: React.FC<Props> = ({
  handleAddComment,
  isCommentLoading,
}) => {
  const [comment, setComment] = useState<CommentData>({
    name: '',
    body: '',
    email: '',
  });
  const [hasNameError, setHasNameError] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasBodyError, setHasBodyError] = useState(false);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasNameError(false);
    setComment(currComment => ({
      ...currComment,
      name: event.target.value,
    }));
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasEmailError(false);
    setComment(currComment => ({
      ...currComment,
      email: event.target.value,
    }));
  };

  const handleChangeBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHasBodyError(false);
    setComment(currComment => ({
      ...currComment,
      body: event.target.value,
    }));
  };

  const handleClear = () => {
    setComment({
      name: '',
      body: '',
      email: '',
    });
    setHasBodyError(false);
    setHasEmailError(false);
    setHasNameError(false);
  };

  const clearAfterAdd = () => {
    setComment(currComment => ({
      ...currComment,
      body: '',
    }));
  };

  const onAddComment = (event: React.FormEvent) => {
    event.preventDefault();

    const isAllInfomationValid = (
      comment.name.trim()
      && comment.email.trim()
      && comment.body.trim()
    );

    if (!isAllInfomationValid) {
      if (!comment.name.trim()) {
        setHasNameError(true);
      }

      if (!comment.email.trim()) {
        setHasEmailError(true);
      }

      if (!comment.body.trim()) {
        setHasBodyError(true);
      }
    } else {
      handleAddComment(comment);
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
            className={classNames('input', {
              'is-danger': hasNameError,
            })}
            value={comment.name}
            onChange={handleChangeName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            {hasNameError && (
              <i className="fas fa-exclamation-triangle" />
            )}
          </span>
        </div>

        {hasNameError && (
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
              'is-danger': hasEmailError,
            })}
            value={comment.email}
            onChange={handleChangeEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            {hasEmailError && (
              <i className="fas fa-exclamation-triangle" />
            )}
          </span>
        </div>

        {hasEmailError && (
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
              'is-danger': hasBodyError,
            })}
            value={comment.body}
            onChange={handleChangeBody}
          />
        </div>
        {hasBodyError && (
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
              'is-loading': isCommentLoading,
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
