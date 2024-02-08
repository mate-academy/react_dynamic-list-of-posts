import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { TodosContext } from '../../TodoContext/TodoContext';
import { Comment } from '../../types/Comment';
import { Errors } from '../../types/Errors';
import { createComment } from '../../utils/users';

export const NewCommentForm: React.FC = () => {
  const {
    availNewComment,
    setPostComments,
    postComments,
    selectedPost,
    setErrorMessage,
  } = useContext(TodosContext);

  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(false);

  const [hasNameError, setHasNameError] = useState('');
  const [hasEmailError, setHasEmailError] = useState('');
  const [hasBodyError, setHasBodyError] = useState('');

  const handleReset = (event: React.FormEvent) => {
    event.preventDefault();

    setHasNameError('');
    setHasEmailError('');
    setHasBodyError('');

    setAuthorName('');
    setAuthorEmail('');
    setCommentText('');
  };

  const handleAuthorName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorName(event.target.value);

    setHasNameError('');
  };

  const handleAuthorEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorEmail(event.target.value);

    setHasEmailError('');
  };

  const handleCommentText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(event.target.value);

    setHasBodyError('');
  };

  function addComment({
    postId,
    name,
    email,
    body,
  }: Comment) {
    setLoading(true);

    createComment({
      postId,
      name,
      email,
      body,
    })
      .then(newComment => {
        setPostComments([...postComments, newComment]);
      })
      .catch(() => setErrorMessage(true))
      .finally(() => {
        setAuthorName('');
        setAuthorEmail('');
        setLoading(false);
      });
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedPost) {
      return;
    }

    const nameTrimmed = authorName.trim();
    const emailTrimmed = authorEmail.trim();
    const bodyTrimmed = commentText.trim();

    if (!nameTrimmed) {
      setHasNameError(Errors.ErrorName);
    }

    if (emailTrimmed.length < 1) {
      setHasEmailError(Errors.ErrorEmail);
    }

    if (bodyTrimmed.length < 1) {
      setHasBodyError(Errors.ErrorMessage);
    }

    if (!nameTrimmed || !emailTrimmed || !bodyTrimmed) {
      return;
    }

    addComment({
      id: postComments.length,
      postId: selectedPost.id,
      name: nameTrimmed,
      email: emailTrimmed,
      body: bodyTrimmed,
    });
  };

  return (
    <>
      {availNewComment && (
        <form
          data-cy="NewCommentForm"
          onSubmit={handleSubmit}
          onReset={handleReset}
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
                value={authorName}
                onChange={handleAuthorName}
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
                {Errors.ErrorName}
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
                value={authorEmail}
                onChange={handleAuthorEmail}
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
                {Errors.ErrorEmail}
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
                value={commentText}
                onChange={handleCommentText}
              />
            </div>

            {hasBodyError && (
              <p className="help is-danger" data-cy="ErrorMessage">
                {Errors.ErrorMessage}
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
              <button
                type="reset"
                className="button is-link is-light"
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
