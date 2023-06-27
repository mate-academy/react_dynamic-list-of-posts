import React, { useState } from 'react';
import classNames from 'classnames';
import { CommentData } from '../types/Comment';

type Props = {
  onAddComment: (commnet: CommentData) => Promise<void>;
  postId: number,
};

export const NewCommentForm: React.FC<Props> = ({ onAddComment, postId }) => {
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [commentInput, setCommentInput] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [commentError, setCommentError] = useState(false);
  const [isAddingComment, setIsAddingComment] = useState(false);

  const errorsCheck = () => {
    setNameError(!nameInput.trim());
    setEmailError(!emailInput.trim());
    setCommentError(!commentInput.trim());
  };

  const clearAll = () => {
    setNameError(false);
    setEmailError(false);
    setCommentError(false);
    setNameInput('');
    setEmailInput('');
    setCommentInput('');
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.currentTarget.value);
    setNameError(false);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
    setEmailError(false);
  };

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentInput(e.target.value);
    setCommentError(false);
  };

  const postComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    errorsCheck();

    if (nameInput && emailInput && commentInput) {
      try {
        setIsAddingComment(true);

        const newComment = {
          name: nameInput,
          email: emailInput,
          body: commentInput,
          postId,
        };

        await onAddComment(newComment);
      } catch {
        throw new Error('Can\'t add new comment');
      } finally {
        setIsAddingComment(false);
        setCommentInput('');
      }
    }
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={postComment}
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
            className={classNames(
              'input',
              { 'is-danger': nameError },
            )}
            value={nameInput}
            onChange={handleChangeName}
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
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames(
              'input',
              { 'is-danger': emailError },
            )}
            value={emailInput}
            onChange={handleChangeEmail}
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
            value={commentInput}
            onChange={handleChangeComment}
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
              { 'is-loading': isAddingComment },
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
            onClick={clearAll}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
