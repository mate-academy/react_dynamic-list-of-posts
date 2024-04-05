import React, { useState } from 'react';
import { Post } from '../types/Post';
import { Error } from '../types/Error';
import classNames from 'classnames';
import { addComment } from '../api/comments';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post | null;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  onSetError: (errorMessage: Error | '') => void;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPost,
  comments,
  setComments,
  onSetError,
}) => {
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [newCommentBody, setNewCommentBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAuthorNameError, setHasAuthorNameError] = useState(false);
  const [hasAuthorEmailError, setHasAuthorEmailError] = useState(false);
  const [hasNewCommentBodyError, setHasNewCommentBodyError] = useState(false);

  const handleAuthorNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAuthorName(event.target.value);
    setHasAuthorNameError(false);
  };

  const handleAuthorEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAuthorEmail(event.target.value);
    setHasAuthorEmailError(false);
  };

  const handleNewCommentBodyChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setNewCommentBody(event.target.value);
    setHasNewCommentBodyError(false);
  };

  const resetErrors = () => {
    setHasAuthorNameError(false);
    setHasAuthorEmailError(false);
    setHasNewCommentBodyError(false);
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!authorName.trim()) {
      setHasAuthorNameError(true);

      return;
    }

    if (!authorEmail.trim()) {
      setHasAuthorEmailError(true);

      return;
    }

    if (!newCommentBody.trim()) {
      setHasNewCommentBodyError(true);

      return;
    }

    setIsSubmitting(true);
    resetErrors();

    const id = selectedPost?.id || 0;

    return addComment({
      postId: id,
      name: authorName,
      email: authorEmail,
      body: newCommentBody,
    })
      .then(newComment => {
        setComments(prevComments => [...prevComments, newComment]);
        setNewCommentBody('');
      })
      .catch(error => {
        setComments(comments);
        onSetError(Error.LoadingError);
        throw error;
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const clear = () => {
    setAuthorName('');
    setAuthorEmail('');
    setNewCommentBody('');
    resetErrors();
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
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            required
            className={classNames('input', { 'is-danger': hasAuthorNameError })}
            onChange={handleAuthorNameChange}
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
            {Error.CommentNameError}
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
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            required
            className={classNames('input', {
              'is-danger': hasAuthorEmailError,
            })}
            onChange={handleAuthorEmailChange}
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
            {Error.CommentEmailError}
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            value={newCommentBody}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            required
            className={classNames('input', {
              'is-danger': hasNewCommentBodyError,
            })}
            onChange={handleNewCommentBodyChange}
          />
        </div>

        {hasNewCommentBodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {Error.CommentTextError}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': isSubmitting,
            })}
            onClick={submit}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={clear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
