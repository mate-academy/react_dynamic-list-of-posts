import React, { useState } from 'react';
import cn from 'classnames';
import { CommentData } from '../types/Comment';
import { ErrorMessage } from './ErrorMessage';

interface ErrorMessages {
  name: string,
  email: string,
  body: string,
  server: string,
}

const defaultErrorValues: ErrorMessages = {
  name: '',
  email: '',
  body: '',
  server: '',
};

const defaultCommentData: CommentData = {
  name: '',
  email: '',
  body: '',
};

interface Props {
  handleAddNewComment: (commentData: CommentData) => Promise<void>,
}

export const NewCommentForm: React.FC<Props> = ({
  handleAddNewComment,
}) => {
  const [errors, setErrors] = useState<ErrorMessages>(defaultErrorValues);

  const [commentData, setCommentData]
    = useState<CommentData>(defaultCommentData);

  const [isLoading, setIsLoading] = useState(false);

  const handleReset = () => {
    setCommentData(defaultCommentData);
    setErrors({
      ...errors,
      name: '',
      email: '',
      body: '',
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedName = commentData.name.trim();
    const normalizedEmail = commentData.email.trim();
    const normalizedBody = commentData.body.trim();

    const currentErrors = {
      name: !normalizedName ? 'Name is required' : '',
      email: !normalizedEmail ? 'Email is required' : '',
      body: !normalizedBody ? 'Enter some text' : '',
    };

    if (currentErrors.name || currentErrors.email || currentErrors.body) {
      setErrors({
        ...errors,
        ...currentErrors,
      });

      return;
    }

    setIsLoading(true);

    handleAddNewComment({
      name: normalizedName,
      email: normalizedEmail,
      body: normalizedBody,
    })
      .then(() => {
        setErrors(defaultErrorValues);

        setCommentData({
          ...commentData,
          body: '',
        });
      })
      .catch(() => {
        setErrors({
          ...errors,
          server: 'Unable to add a comment',
        });
      })
      .finally(() => setIsLoading(false));
  };

  const handleCommentChanged = (
    event: React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setErrors({
      ...errors,
      [event.target.name]: '',
    });

    setCommentData({
      ...commentData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form
      data-cy="NewCommentForm"
      onReset={handleReset}
      onSubmit={handleSubmit}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={commentData.name}
            onChange={handleCommentChanged}
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', {
              'is-danger': !!errors.name,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.name && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.name}
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={commentData.email}
            onChange={handleCommentChanged}
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', {
              'is-danger': !!errors.email,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.email && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.email}
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            value={commentData.body}
            onChange={handleCommentChanged}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={cn('textarea', {
              'is-danger': !!errors.body,
            })}
          />
        </div>

        {errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.body}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', {
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
      {!!errors.server && (
        <ErrorMessage errorMessage={errors.server} />
      )}
    </form>
  );
};
