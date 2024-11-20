import classNames from 'classnames';
import React, { useState } from 'react';
import { Comment } from '../types/Comment';

type Props = {
  postId: number;
  isLoadingComments: boolean;
  onSubmit: (comment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  onSubmit,
  isLoadingComments,
}) => {
  const [authorName, setAuthorName] = useState('');
  const [authorNameError, setAuthorNameError] = useState('');

  const [authorEmail, setAuthorEmail] = useState('');
  const [authorEmailError, setAuthorEmailError] = useState('');

  const [commentText, setCommentText] = useState('');
  const [commentTextError, setCommentTextError] = useState('');

  const handleAuthorNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAuthorName(event.target.value);
    setAuthorNameError('');
  };

  const handleAuthorEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAuthorEmail(event.target.value);
    setAuthorEmailError('');
  };

  const handleCommentTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCommentText(event.target.value);
    setCommentTextError('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!authorName) {
      setAuthorNameError('Name is required');
    }

    if (!authorEmail) {
      setAuthorEmailError('Email is required');
    }

    if (!commentText) {
      setCommentTextError('Enter some text');
    }

    if (!authorName || !authorEmail || !commentText) {
      return;
    }

    onSubmit({
      id: 0,
      postId: postId,
      name: authorName,
      email: authorEmail,
      body: commentText,
    });
  };

  const handleClearForm = () => {
    setAuthorName('');
    setAuthorEmail('');
    setCommentText('');

    setAuthorNameError('');
    setAuthorEmailError('');
    setCommentTextError('');
  };

  return (
    <form data-cy="NewCommentForm">
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={authorName}
            onChange={handleAuthorNameChange}
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': authorNameError.length > 0,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          <span
            className={classNames('icon is-small is-right ', {
              'has-text-danger': authorNameError.length > 0,
            })}
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        {authorNameError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {authorNameError}
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={authorEmail}
            onChange={handleAuthorEmailChange}
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': authorEmailError.length > 0,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          <span
            className={classNames('icon is-small is-right ', {
              'has-text-danger': authorEmailError.length > 0,
            })}
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>
        {authorEmailError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {authorEmailError}
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            value={commentText}
            onChange={handleCommentTextChange}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('textarea', {
              'is-danger': commentTextError.length > 0,
            })}
          />
        </div>
        {commentTextError.length > 0 && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {commentTextError}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': isLoadingComments,
            })}
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
