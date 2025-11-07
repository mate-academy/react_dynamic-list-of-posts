import classNames from 'classnames';
import React, { useState } from 'react';
import { CommentData } from '../types/Comment';
import { addComment } from '../utils/fetchClient';

type Props = {
  postId: number;
  onSubmit: (comment: CommentData) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, onSubmit }) => {
  const [name, setName] = useState('');
  const [hasNameError, setHasNameError] = useState(false);
  const [mail, setMail] = useState('');
  const [hasMailError, setHasMailError] = useState(false);
  const [comment, setComment] = useState('');
  const [hasCommentError, setHasCommentError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitError, setHasSubmitError] = useState<string | null>(null);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setHasNameError(false);
  };

  const handleMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMail(event.target.value);
    setHasMailError(false);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setComment(event.target.value);
    setHasCommentError(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setHasNameError(!name.trim());
    setHasMailError(!mail.trim());
    setHasCommentError(!comment.trim());

    if (!name.trim() || !mail.trim() || !comment.trim()) {
      return;
    }

    setHasSubmitError(null);
    setIsLoading(true);

    try {
      const newComment = await addComment({
        postId,
        name,
        email: mail,
        body: comment,
      });

      onSubmit(newComment);
      setComment('');
    } catch {
      setHasSubmitError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async (event: React.FormEvent) => {
    event.preventDefault();

    setHasSubmitError(null);

    try {
      setName('');
      setMail('');
      setComment('');
      setHasNameError(false);
      setHasMailError(false);
      setHasCommentError(false);
    } catch {
      setHasSubmitError('Something went wrong');
    }
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div
          className={classNames('control has-icons-left', {
            'has-icons-right': hasNameError,
          })}
        >
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': hasNameError,
            })}
            value={name}
            onChange={handleNameChange}
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

        <div
          className={classNames('control has-icons-left', {
            'has-icons-right': hasMailError,
          })}
        >
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': hasMailError,
            })}
            value={mail}
            onChange={handleMailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasMailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasMailError && (
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
              'is-danger': hasCommentError,
            })}
            value={comment}
            onChange={handleCommentChange}
          />
        </div>

        {hasCommentError && (
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
          {/* eslint-disable-next-line react/button-has-type */}
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
      {hasSubmitError && (
        <div className="notification is-danger" data-cy="CommentsError">
          {hasSubmitError}
        </div>
      )}
    </form>
  );
};
