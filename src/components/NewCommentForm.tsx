import React, { useState } from 'react';
import cn from 'classnames';
import { Comment } from '../types/Comment';

type Props = {
  onAdd: (comment: Omit<Comment, 'id'>) => void;
  isLoading: boolean;
  postId: number;
};

export const NewCommentForm: React.FC<Props> = ({
  onAdd,
  isLoading,
  postId,
}) => {
  const [authorName, setAuthorName] = useState('');
  const [hasAuthorNameError, setHasAuthorNameError] = useState(false);
  const [authorEmail, setAuthorEmail] = useState('');
  const [hasAuthorEmailError, setHasAuthorEmailError] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  const [hasNewCommentTextError, setHasNewCommentTextError] = useState(false);

  const handleChangeAuthorName = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setHasAuthorNameError(false);
    setAuthorName(event.target.value);
  };

  const handleChangeAuthorEmail = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setHasAuthorEmailError(false);
    setAuthorEmail(event.target.value);
  };

  const handleChangeNewCommentText = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setHasNewCommentTextError(false);
    setNewCommentText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!authorName || !authorEmail || !newCommentText) {
      setHasAuthorNameError(!authorName);
      setHasAuthorEmailError(!authorEmail);
      setHasNewCommentTextError(!newCommentText);

      return;
    }

    const newComment: Omit<Comment, 'id'> = {
      postId,
      name: authorName,
      email: authorEmail,
      body: newCommentText,
    };

    onAdd(newComment);
    setNewCommentText('');
  };

  const handleClickResetBtn = () => {
    setAuthorName('');
    setAuthorEmail('');
    setNewCommentText('');
    setHasAuthorNameError(false);
    setHasAuthorEmailError(false);
    setHasNewCommentTextError(false);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
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
            className={cn(
              'input',
              { 'is-danger': hasAuthorNameError },
            )}
            value={authorName}
            onChange={handleChangeAuthorName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasAuthorNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasAuthorNameError && (
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
            className={cn(
              'input',
              { 'is-danger': hasAuthorEmailError },
            )}
            value={authorEmail}
            onChange={handleChangeAuthorEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasAuthorEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasAuthorEmailError && (
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
            className={cn(
              'textarea',
              { 'is-danger': hasNewCommentTextError },
            )}
            value={newCommentText}
            onChange={handleChangeNewCommentText}
          />
        </div>

        {hasNewCommentTextError && (
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
              { 'is-loading': isLoading },
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
            onClick={handleClickResetBtn}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
