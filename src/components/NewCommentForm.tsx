import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import { createPostComment } from '../api/comments';
import classNames from 'classnames';

type Props = {
  postId: number;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export const NewCommentForm: React.FC<Props> = ({ postId, setComments }) => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const [commentatorName, setCommentatorName] = useState('');
  const [hasNameError, setHasNameError] = useState(false);

  const [commentatorEmail, setCommentatorEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);

  const [commentBody, setCommentBody] = useState('');
  const [hasBodyError, setHasBodyError] = useState(false);

  const handleAddingName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentatorName(event.target.value);
    setHasNameError(false);
  };

  const handleAddingEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentatorEmail(event.target.value);
    setHasEmailError(false);
  };

  const handleAddingBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentBody(event.target.value);
    setHasBodyError(false);
  };

  const handleResetting = () => {
    setCommentatorName('');
    setCommentatorEmail('');
    setCommentBody('');
    setHasNameError(false);
    setHasEmailError(false);
    setHasBodyError(false);
  };

  const handleAddingComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const preparedName = commentatorName.trim();
    const preparedEmail = commentatorEmail.trim();
    const preparedBody = commentBody.trim();

    setHasNameError(!preparedName);
    setHasEmailError(!preparedEmail || !emailRegex.test(preparedEmail));
    setHasBodyError(!preparedBody);

    if (
      !preparedName ||
      !preparedEmail ||
      !preparedBody ||
      !emailRegex.test(preparedEmail)
    ) {
      return;
    }

    setLoading(true);

    createPostComment({
      postId,
      name: preparedName,
      email: preparedEmail,
      body: preparedBody,
    })
      .then(newComment => {
        setComments(currentComments => [...currentComments, newComment]);
        setCommentBody('');
      })
      .catch(() => {
        setError('Failed to add comment');
        setTimeout(() => {
          setError('');
        }, 3000);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {error && (
        <div className="notification is-danger" data-cy="AddCommentError">
          Something went wrong!
        </div>
      )}

      <form
        data-cy="NewCommentForm"
        onSubmit={handleAddingComment}
        onReset={handleResetting}
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
                'is-danger': hasNameError,
              })}
              value={commentatorName}
              onChange={handleAddingName}
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
              type="text"
              name="email"
              id="comment-author-email"
              placeholder="email@test.com"
              className={classNames('input', {
                'is-danger': hasEmailError,
              })}
              value={commentatorEmail}
              onChange={handleAddingEmail}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>

            {hasEmailError && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>

          {hasEmailError && (
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
                'is-danger': hasBodyError,
              })}
              value={commentBody}
              onChange={handleAddingBody}
            />
          </div>

          {hasBodyError && (
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
                'is-loading': loading,
              })}
            >
              Add
            </button>
          </div>

          <div className="control">
            {/* eslint-disable-next-line react/button-has-type */}
            <button type="reset" className="button is-link is-light">
              Clear
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
