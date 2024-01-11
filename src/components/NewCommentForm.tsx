import React, { useState } from 'react';
import cn from 'classnames';

import { Comment } from '../types/Comment';
import { addComment } from '../api/comments';

interface Props {
  postId: number,
  addNewComment: (el: Comment) => void,
  changeErrorState: (el: boolean) => void,
}

export const NewCommentForm: React.FC<Props> = ({
  postId,
  addNewComment,
  changeErrorState,
}) => {
  const [inputName, setInputName] = useState('');
  const [inputMail, setInputMail] = useState('');
  const [textarea, setTextarea] = useState('');
  const [hasNameError, setHasNameError] = useState(false);
  const [hasMailError, setHasMailError] = useState(false);
  const [hasTextareaError, setHasTextareaError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const handleReset = () => {
    setInputName('');
    setInputMail('');
    setTextarea('');
  };

  const handleSumbit = (event: React.FormEvent) => {
    event.preventDefault();
    changeErrorState(false);
    const newComment = {
      id: 0,
      postId,
      name: inputName,
      email: inputMail,
      body: textarea,
    };

    if (inputName.trim() && inputMail.trim() && textarea.trim()) {
      setIsAdding(true);
      addComment('/comments', newComment)
        .then(() => {
          setTextarea('');
          addNewComment(newComment);
          setIsAdding(false);
        })
        .catch(() => changeErrorState(true));
    }

    if (!inputName.trim()) {
      setHasNameError(true);
    }

    if (!inputMail.trim()) {
      setHasMailError(true);
    }

    if (!textarea.trim()) {
      setHasTextareaError(true);
    }
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(event.target.value);
    setHasNameError(false);
  };

  const handleChangeMail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMail(event.target.value);
    setHasMailError(false);
  };

  // eslint-disable-next-line max-len
  const handleChangeTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextarea(event.target.value);
    setHasTextareaError(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSumbit}>
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
            className={cn('input', { 'is-danger': hasNameError })}
            value={inputName}
            onChange={event => handleChangeName(event)}
            required
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
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
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', { 'is-danger': hasMailError })}
            value={inputMail}
            onChange={event => handleChangeMail(event)}
            required
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasMailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasMailError && (
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
            className={cn('textarea', { 'is-danger': hasTextareaError })}
            value={textarea}
            onChange={event => handleChangeTextarea(event)}
          />
        </div>

        {hasTextareaError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button', 'is-link', { 'is-loading': isAdding })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
