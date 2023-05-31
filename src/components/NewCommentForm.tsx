import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { CommentData } from '../types/Comment';

type Props = {
  postId: number;
  addComment: (comment: CommentData) => void;
  isCommentAdditionError: boolean;
  isCommentAdditionLoading: boolean;
};

export const NewCommentForm: React.FC<Props> = React.memo(({
  postId,
  addComment,
  isCommentAdditionError,
  isCommentAdditionLoading,
}) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userComment, setUserComment] = useState('');
  const [isUserRequired, setIsUserRequired] = useState(false);
  const [isUserEmailRequired, setIsUserEmailRequired] = useState(false);
  const [isUserCommentRequired, setIsUserCommentRequired] = useState(false);

  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    const normalizedUserName = userName.trim();
    const normalizedUserEmail = userEmail.trim();
    const normalizedUserComment = userComment.trim();

    if (!normalizedUserName) {
      setIsUserRequired(true);
    }

    if (!normalizedUserEmail) {
      setIsUserEmailRequired(true);
    }

    if (!normalizedUserComment) {
      setIsUserCommentRequired(true);
    }

    if (normalizedUserName && normalizedUserEmail && normalizedUserComment) {
      const comment: CommentData = {
        postId,
        name: userName,
        email: userEmail,
        body: userComment,
      };

      addComment(comment);
      setUserComment('');
    }
  }, [userName, userEmail, userComment]);

  const handleResetClick = useCallback(() => {
    setUserName('');
    setIsUserRequired(false);
    setUserEmail('');
    setIsUserEmailRequired(false);
    setUserComment('');
    setIsUserCommentRequired(false);
  }, []);

  const handleUserInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isUserRequired) {
        setIsUserRequired(false);
      }

      setUserName(event.target.value);
    }, [userName, isUserRequired],
  );

  const handleUserEmailInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isUserEmailRequired) {
        setIsUserEmailRequired(false);
      }

      setUserEmail(event.target.value);
    }, [userEmail, isUserEmailRequired],
  );

  const handleUserCommentInput = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (isUserCommentRequired) {
        setIsUserCommentRequired(false);
      }

      setUserComment(event.target.value);
    }, [userComment, isUserCommentRequired],
  );

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
            className={classNames('input', { 'is-danger': isUserRequired })}
            value={userName}
            onChange={handleUserInput}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isUserRequired && (
            <>
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>

              <p className="help is-danger" data-cy="ErrorMessage">
                Name is required
              </p>
            </>
          )}
        </div>
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
              'is-danger': isUserEmailRequired,
            })}
            value={userEmail}
            onChange={handleUserEmailInput}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isUserEmailRequired && (
            <>
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>

              <p className="help is-danger" data-cy="ErrorMessage">
                Email is required
              </p>
            </>
          )}
        </div>
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
              'is-danger': isUserCommentRequired,
            })}
            value={userComment}
            onChange={handleUserCommentInput}
          />
        </div>

        {isUserCommentRequired && (
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
              'is-loading': isCommentAdditionLoading,
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
            onClick={handleResetClick}
          >
            Clear
          </button>
        </div>

      </div>

      {isCommentAdditionError && (
        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong
        </div>
      )}
    </form>
  );
});
