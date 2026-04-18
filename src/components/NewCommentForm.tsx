import React, { useState } from 'react';
import classNames from 'classnames';
import { createComment } from '../utils/postData';
import { Comment } from '../types/Comment';

export const NewCommentForm: React.FC<{
  postId: number;
  handleError: () => void;
  onCommentCreated: (comment: Comment) => void;
}> = ({ postId, handleError, onCommentCreated }) => {
  const [name, setSetName] = useState('');
  const [email, setSetEmail] = useState('');
  const [text, setText] = useState('');

  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isTextValid, setIsTextValid] = useState(true);

  const [isCommentCreating, setIsCommentCreating] = useState(false);

  const handleClear = () => {
    setSetName('');
    setSetEmail('');
    setText('');

    setIsNameValid(true);
    setIsEmailValid(true);
    setIsTextValid(true);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={event => {
        event.preventDefault();

        const nameValid = name.trim().length > 0;
        const emailValid = email.trim().length > 0;
        const textValid = text.trim().length > 0;

        setIsNameValid(nameValid);
        setIsEmailValid(emailValid);
        setIsTextValid(textValid);

        if (!nameValid && !emailValid && !textValid) {
          return;
        }

        setIsCommentCreating(true);
        const newComment: Comment = {
          id: 0,
          postId,
          name,
          email,
          body: text,
        };

        createComment(newComment)
          .then(() => {
            onCommentCreated(newComment);
            setText('');
          })
          .catch(() => handleError())
          .finally(() => setIsCommentCreating(false));
      }}
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
            className={classNames('input', { 'is-danger': !isNameValid })}
            value={name}
            onChange={event => setSetName(event.target.value)}
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
            className={classNames('input', { 'is-danger': !isEmailValid })}
            value={email}
            onChange={event => setSetEmail(event.target.value)}
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
            className={classNames('textarea', { 'is-danger': !isTextValid })}
            value={text}
            onChange={event => setText(event.target.value)}
          />
        </div>

        {!isTextValid && (
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
              'is-loading': isCommentCreating,
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
