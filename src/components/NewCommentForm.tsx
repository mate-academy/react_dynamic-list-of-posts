import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import classNames from 'classnames';
import { client } from '../utils/fetchClient';

type Props = {
  postId: number;
  onSuccess: (newComment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, onSuccess }) => {
  const [authorName, setAuthorName] = useState('');
  const [hasAuthorNameError, setHasAuthorNameError] = useState(false);

  const [authorEmail, setAuthorEmail] = useState('');
  const [hasAuthorEmailError, setHasAuthorEmailError] = useState(false);

  const [commentText, setCommentText] = useState('');
  const [hasCommentTextError, setHasCommentTextError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const authorNameTrimmed = authorName.trim();
    const authorEmailTrimmed = authorEmail.trim();
    const commentTextTrimmed = commentText.trim();

    const isAuthorEmailInputValid =
      authorEmailTrimmed.length &&
      authorEmailTrimmed.split('@').length === 2 &&
      authorEmailTrimmed.split('@')[1].split('.').length === 2;

    if (!authorNameTrimmed.length) {
      setHasAuthorNameError(true);
    }

    if (!isAuthorEmailInputValid) {
      setHasAuthorEmailError(true);
    }

    if (!commentTextTrimmed.length) {
      setHasCommentTextError(true);
    }

    if (
      !authorNameTrimmed.length ||
      !isAuthorEmailInputValid ||
      !commentTextTrimmed.length
    ) {
      return;
    }

    setIsLoading(true);

    const newComment = {
      name: authorNameTrimmed,
      email: authorEmailTrimmed,
      body: commentTextTrimmed,
      postId: postId,
    };

    const result = client.post<Comment>('/comments', newComment);

    result
      .then(response => {
        setCommentText('');
        onSuccess(response);
      })
      .catch(() => {
        throw new Error('Unable to post a comment');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleReset() {
    setAuthorName('');
    setAuthorEmail('');
    setCommentText('');

    setHasAuthorNameError(false);
    setHasAuthorEmailError(false);
    setHasCommentTextError(false);
  }

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={event => handleSubmit(event)}
      onReset={() => handleReset()}
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
              'is-danger': hasAuthorNameError,
            })}
            value={authorName}
            onChange={event => {
              if (hasAuthorNameError) {
                setHasAuthorNameError(false);
              }

              setAuthorName(event.target.value);
            }}
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
            className={classNames('input', {
              'is-danger': hasAuthorEmailError,
            })}
            value={authorEmail}
            onChange={event => {
              if (hasAuthorEmailError) {
                setHasAuthorEmailError(false);
              }

              setAuthorEmail(event.target.value);
            }}
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
            className={classNames('textarea', {
              'is-danger': hasCommentTextError,
            })}
            value={commentText}
            onChange={event => {
              if (hasCommentTextError) {
                setHasCommentTextError(false);
              }

              setCommentText(event.target.value);
            }}
          />
        </div>

        {hasCommentTextError && (
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
              'is-loading': isLoading,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
