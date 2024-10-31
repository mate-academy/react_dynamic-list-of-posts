import classNames from 'classnames';
import React, { useState } from 'react';
import { CommentData } from '../types/Comment';

interface Props {
  addNewComment: (newComment: CommentData) => Promise<void>;
  isSubmitting: boolean;
}

const initialNewComment = {
  name: '',
  email: '',
  body: '',
};

const initialErrors = {
  nameError: '',
  emailError: '',
  bodyError: '',
};

export const NewCommentForm: React.FC<Props> = ({
  addNewComment,
  isSubmitting,
}) => {
  const [commentData, setCommentData] = useState(initialNewComment);
  const [hasErrorMessage, setHasErrorMessage] = useState(initialErrors);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setHasErrorMessage(initialErrors);

    const normalizedData = {
      name: commentData.name.trim(),
      email: commentData.email.trim(),
      body: commentData.body.trim(),
    };

    if (normalizedData.name.length === 0) {
      setHasErrorMessage(errors => ({
        ...errors,
        nameError: 'Name is required',
      }));
    }

    if (normalizedData.email.length === 0) {
      setHasErrorMessage(errors => ({
        ...errors,
        emailError: 'Email is required',
      }));
    }

    if (normalizedData.body.length === 0) {
      setHasErrorMessage(errors => ({
        ...errors,
        bodyError: 'Enter some text',
      }));
    }

    if (
      normalizedData.name.length === 0 ||
      normalizedData.email.length === 0 ||
      normalizedData.body.length === 0
    ) {
      return;
    }

    addNewComment(normalizedData)
      .then(() => {
        commentData.body = '';
      })
      .catch(error => {
        setCommentData(initialNewComment);

        throw error;
      });
  };

  const handleClearButton = () => {
    setCommentData(initialNewComment);
    setHasErrorMessage(initialErrors);
  };

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
            className={classNames('input', {
              'is-danger': hasErrorMessage.nameError.length > 0,
            })}
            value={commentData.name}
            onChange={event =>
              setCommentData(prev => ({
                ...prev,
                name: event.target.value,
              }))
            }
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasErrorMessage.nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasErrorMessage.nameError.length > 0 && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {hasErrorMessage.nameError}
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
              'is-danger': hasErrorMessage.emailError.length > 0,
            })}
            value={commentData.email}
            onChange={event =>
              setCommentData(prev => ({
                ...prev,
                email: event.target.value,
              }))
            }
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasErrorMessage.emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasErrorMessage.emailError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {hasErrorMessage.emailError}
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
              'is-danger': hasErrorMessage.bodyError.length > 0,
            })}
            value={commentData.body}
            onChange={event =>
              setCommentData(prev => ({
                ...prev,
                body: event.target.value,
              }))
            }
          />
        </div>

        {hasErrorMessage.bodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {hasErrorMessage.bodyError}
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
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClearButton}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
