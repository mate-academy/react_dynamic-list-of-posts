import classNames from 'classnames';
import React, { useState } from 'react';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

type Props = {
  postId: number | undefined,
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  setComments,
}) => {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [commentValue, setCommentValue] = useState('');
  const [isValidName, setIsValidName] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidComment, setIsValidComment] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const reset = () => {
    setNameValue('');
    setIsValidName(true);
    setEmailValue('');
    setIsValidEmail(true);
    setCommentValue('');
    setIsValidComment(true);
  };

  const handleNameInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsValidName(true);
    setNameValue(event.target.value);
  };

  const handleEmailInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsValidEmail(true);
    setEmailValue(event.target.value);
  };

  const handleCommentInput = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setIsValidComment(true);
    setCommentValue(event.target.value);
  };

  const postComment = () => {
    setIsValidName(!!nameValue.trim().length);
    setIsValidEmail(!!emailValue.trim().length);
    setIsValidComment(!!commentValue.trim().length);

    if (!!nameValue.trim().length
        && !!emailValue.trim().length
        && !!commentValue.trim().length) {
      const newComment = {
        postId,
        name: nameValue,
        email: emailValue,
        body: commentValue,
      };

      setIsLoading(true);

      client.post<Comment>('/comments', newComment)
        .then((createdComment) => {
          setComments(
            (prevComments) => [...prevComments, createdComment],
          );
          setIsError(false);
          setCommentValue('');
        })
        .catch(() => setIsError(true))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleRetry = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    postComment();
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    postComment();
  };

  const handleRefresh = () => window.location.reload();

  return (
    <>
      {isError && (
        <div className="notification is-danger" data-cy="CommentsError">
          <div className="level">
            <div className="level-left">
              <p>Something went wrong</p>
            </div>
            <div className="level-right">
              <button
                type="button"
                onClick={event => handleRetry(event)}
                className="button has-background-danger has-text-white"
                style={{ marginRight: '20px' }}
              >
                <span className="icon">
                  <i className="fas fa-redo-alt" />
                </span>
                <span>Retry</span>
              </button>
              <button
                type="button"
                onClick={handleRefresh}
                className="button has-background-danger has-text-white"
                style={{ border: '1px solid white' }}
              >
                <span className="icon">
                  <i className="fas fa-sync-alt" />
                </span>
                <span>Refresh Page</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {!isError && (
        <form
          data-cy="NewCommentForm"
          onSubmit={event => handleSubmit(event)}
        >
          <div className="field" data-cy="NameField">
            <label className="label" htmlFor="comment-author-name">
              Author Name
            </label>

            <div className="control has-icons-left has-icons-right">
              <input
                value={nameValue}
                onChange={event => handleNameInput(event)}
                type="text"
                name="name"
                id="comment-author-name"
                placeholder="Name Surname"
                className={classNames('input', {
                  'is-danger': !isValidName,
                })}
              />

              <span className="icon is-small is-left">
                <i className="fas fa-user" />
              </span>

              {!isValidName && (
                <span
                  className="icon is-small is-right has-text-danger"
                  data-cy="ErrorIcon"
                >
                  <i className="fas fa-exclamation-triangle" />
                </span>
              )}
            </div>

            {!isValidName && (
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
                value={emailValue}
                onChange={event => handleEmailInput(event)}
                type="text"
                name="email"
                id="comment-author-email"
                placeholder="email@test.com"
                className={classNames('input', {
                  'is-danger': !isValidEmail,
                })}
              />

              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>

              {!isValidEmail && (
                <span
                  className="icon is-small is-right has-text-danger"
                  data-cy="ErrorIcon"
                >
                  <i className="fas fa-exclamation-triangle" />
                </span>
              )}
            </div>

            {!isValidEmail && (
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
                value={commentValue}
                onChange={event => handleCommentInput(event)}
                id="comment-body"
                name="body"
                placeholder="Type comment here"
                className={classNames('textarea', {
                  'is-danger': !isValidComment,
                })}
              />
            </div>

            {!isValidComment && (
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
                  'is-loading': isLoading,
                })}
              >
                Add
              </button>
            </div>

            <div className="control">
              <button
                type="button"
                className="button is-link is-light"
                onClick={reset}
              >
                Clear
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};
