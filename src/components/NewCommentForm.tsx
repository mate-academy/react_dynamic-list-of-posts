import React, { useState } from 'react';
import cn from 'classnames';
import { CommentData } from '../types/Comment';

type Props = {
  handleCommentCreate: (comment: CommentData) => void;
  isCommentLoading: boolean;
};

export const NewCommentForm: React.FC<Props> = ({
  handleCommentCreate,
  isCommentLoading,
}) => {
  const [comment, setComment] = useState<CommentData>({
    name: '',
    email: '',
    body: '',
  });
  const [isNameError, setIsNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isBodyError, setIsBodyError] = useState(false);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsNameError(false);
    setComment(prevComment => ({
      ...prevComment,
      name: event.target.value,
    }));
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEmailError(false);
    setComment(prevComment => ({
      ...prevComment,
      email: event.target.value,
    }));
  };

  const handleChangeBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsBodyError(false);
    setComment(prevComment => ({
      ...prevComment,
      body: event.target.value,
    }));
  };

  const clear = () => {
    setComment({
      name: '',
      email: '',
      body: '',
    });
  };

  const clearAdd = () => {
    setComment(prevComment => ({
      ...prevComment,
      body: '',
    }));
  };

  const onAddComment = (event: React.FormEvent) => {
    event.preventDefault();

    const nameValid = comment.name.trim();
    const emailValid = comment.email.trim();
    const bodyValid = comment.body.trim();

    if (!nameValid) {
      setIsNameError(true);
    } else if (!emailValid) {
      setIsEmailError(true);
    } else if (!bodyValid) {
      setIsBodyError(true);
    } else {
      handleCommentCreate(comment);
      clearAdd();
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
            onChange={(e) => handleChangeName(e)}
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
            onChange={(e) => handleChangeEmail(e)}
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
            onClick={clear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
