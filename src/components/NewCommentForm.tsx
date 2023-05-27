import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { CommentData } from '../types/Comment';

type Props = {
  postId: number;
  addComment: (comment: CommentData) => void;
  commentAdditionError: boolean;
  commentAdditionLoading: boolean;
};

export const NewCommentForm: React.FC<Props> = React.memo(({
  postId,
  addComment,
  commentAdditionError,
  commentAdditionLoading,
}) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userComment, setUserComment] = useState('');
  const [userRequired, setUserRequired] = useState(false);
  const [userEmailRequired, setUserEmailRequired] = useState(false);
  const [userCommentRequired, setUserCommentRequired] = useState(false);

  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    const normalizedUserName = userName.trim();
    const normalizedUserEmail = userEmail.trim();
    const normalizedUserComment = userComment.trim();

    if (!normalizedUserName) {
      setUserRequired(true);
    }

    if (!normalizedUserEmail) {
      setUserEmailRequired(true);
    }

    if (!normalizedUserComment) {
      setUserCommentRequired(true);
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
    setUserRequired(false);
    setUserEmail('');
    setUserEmailRequired(false);
    setUserComment('');
    setUserCommentRequired(false);
  }, []);

  const handleUserInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (userRequired) {
        setUserRequired(false);
      }

      setUserName(event.target.value);
    }, [userName, userRequired],
  );

  const handleUserEmailInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (userEmailRequired) {
        setUserEmailRequired(false);
      }

      setUserEmail(event.target.value);
    }, [userEmail, userEmailRequired],
  );

  const handleUserCommentInput = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (userCommentRequired) {
        setUserCommentRequired(false);
      }

      setUserComment(event.target.value);
    }, [userComment, userCommentRequired],
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
            className={classNames('input', { 'is-danger': userRequired })}
            value={userName}
            onChange={handleUserInput}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {userRequired && (
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
            className={classNames('input', { 'is-danger': userEmailRequired })}
            value={userEmail}
            onChange={handleUserEmailInput}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {userEmailRequired && (
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
              'is-danger': userCommentRequired,
            })}
            value={userComment}
            onChange={handleUserCommentInput}
          />
        </div>

        {userCommentRequired && (
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
              'is-loading': commentAdditionLoading,
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

      {commentAdditionError && (
        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong
        </div>
      )}
    </form>
  );
});
