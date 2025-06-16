import React from 'react';
import { Comment } from '../types/Comment';
import cn from 'classnames';
import { useForm } from '../hooks/useForm';

type Props = {
  onCommentAdd?: (
    postId: number,
    commentData: Omit<Comment, 'id' | 'postId'>,
  ) => void;
  postId?: number;
  isCommentsLoading?: boolean;
};

export const NewCommentForm: React.FC<Props> = ({
  onCommentAdd,
  postId,
  isCommentsLoading,
}) => {
  const {
    authorName,
    isAuthorNameError,
    authorEmail,
    isAuthorEmailError,
    commentBody,
    isCommentBodyError,
    handleAuthorNameChange,
    handleAuthorEmailChange,
    handleCommentBodyChange,
    handleSubmit,
    handleReset,
  } = useForm(postId, onCommentAdd);

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
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
            className={cn('input', { 'is-danger': isAuthorNameError })}
            value={authorName}
            onChange={handleAuthorNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isAuthorNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isAuthorNameError && (
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
            className={cn('input', { 'is-danger': isAuthorEmailError })}
            value={authorEmail}
            onChange={handleAuthorEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isAuthorEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isAuthorEmailError && (
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
            className={cn('textarea', { 'is-danger': isCommentBodyError })}
            value={commentBody}
            onChange={handleCommentBodyChange}
          />
        </div>

        {isCommentBodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', {
              'is-loading': isCommentsLoading,
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
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
