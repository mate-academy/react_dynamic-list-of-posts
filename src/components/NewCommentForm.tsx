import React, { useCallback, useContext, useMemo, useState } from 'react';
import cn from 'classnames';
import { ActionType, Comment, ErrorMessage, LoadingType } from '../types';
import { AppContext, AppDispatchContext } from './AppState';
import { addComment } from '../api/comments';

type Props = {
  selectedPostId: number;
};

export const NewCommentForm: React.FC<Props> = ({ selectedPostId }) => {
  const [authorName, setAuthorName] = useState('');
  const [hasAuthorNameError, setHasAuthorNameError] = useState(false);

  const [authorEmail, setAuthorEmail] = useState('');
  const [hasAuthorEmailError, setHasAuthorEmailError] = useState(false);

  const [commentBody, setCommentBody] = useState('');
  const [hasCommentBodyError, setHasCommentBodyError] = useState(false);

  const { loadingType, errorMessage } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);

  const hasPostingError = useMemo(
    () => errorMessage === ErrorMessage.PostingComment,
    [errorMessage],
  );

  const isPostingComment = useMemo(
    () => loadingType === LoadingType.PostingComment,
    [loadingType],
  );

  const handleSubmitForm = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const trimmedName = authorName.trim();
      const trimmedEmail = authorEmail.trim();
      const trimmedCommentBody = commentBody.trim();

      if (!trimmedName) {
        setHasAuthorNameError(true);
      }

      if (!trimmedEmail) {
        setHasAuthorEmailError(true);
      }

      if (!trimmedCommentBody) {
        setHasCommentBodyError(true);
      }

      if (!trimmedName || !trimmedEmail || !trimmedCommentBody) {
        return;
      }

      const newComment: Omit<Comment, 'id'> = {
        postId: selectedPostId,
        name: trimmedName,
        email: trimmedEmail,
        body: trimmedCommentBody,
      };

      dispatch({
        type: ActionType.SetLoadingType,
        payload: LoadingType.PostingComment,
      });
      dispatch({
        type: ActionType.SetErrorMessage,
        payload: ErrorMessage.NoError,
      });
      addComment(newComment)
        .then(comment => {
          dispatch({ type: ActionType.AddComment, payload: comment });
          setCommentBody('');
        })
        .catch(() =>
          dispatch({
            type: ActionType.SetErrorMessage,
            payload: ErrorMessage.PostingComment,
          }),
        )
        .finally(() =>
          dispatch({
            type: ActionType.SetLoadingType,
            payload: LoadingType.NoLoading,
          }),
        );
    },
    [authorName, authorEmail, commentBody, dispatch, selectedPostId],
  );

  const handleAuthorNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAuthorName(e.target.value);
      setHasAuthorNameError(false);
    },
    [],
  );

  const handleAuthorEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAuthorEmail(e.target.value);
      setHasAuthorEmailError(false);
    },
    [],
  );

  const handleCommentBodyChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCommentBody(e.target.value);
      setHasCommentBodyError(false);
    },
    [],
  );

  const handleResetForm = useCallback(() => {
    setAuthorName('');
    setAuthorEmail('');
    setCommentBody('');
    setHasAuthorNameError(false);
    setHasAuthorEmailError(false);
    setHasCommentBodyError(false);
  }, []);

  return (
    <form data-cy="NewCommentForm">
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
            className={cn('input', {
              'is-danger': hasAuthorNameError,
            })}
            value={authorName}
            onChange={e => handleAuthorNameChange(e)}
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
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', {
              'is-danger': hasAuthorEmailError,
            })}
            value={authorEmail}
            onChange={e => handleAuthorEmailChange(e)}
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
            className={cn('input', {
              'is-danger': hasCommentBodyError,
            })}
            value={commentBody}
            onChange={e => handleCommentBodyChange(e)}
          />
        </div>

        {hasCommentBodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      {hasPostingError && (
        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong
        </div>
      )}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button', 'is-link', {
              'is-loading': isPostingComment,
            })}
            onClick={handleSubmitForm}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleResetForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
