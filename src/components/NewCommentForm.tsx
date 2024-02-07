import React, { useState } from 'react';
import cn from 'classnames';
import { CommentData } from '../types/Comment';
import { ErrorMessage } from './ErrorMessage';

interface ErrorMessages {
  nameError: string,
  emailError: string,
  bodyError: string,
  serverError: string,
}

interface Props {
  handleAddNewComment: (commentData: CommentData) => Promise<void>,
}

export const NewCommentForm: React.FC<Props> = ({
  handleAddNewComment,
}) => {
  const [errors, setErrors] = useState<ErrorMessages>({
    nameError: '',
    emailError: '',
    bodyError: '',
    serverError: '',
  });

  const [commentData, setCommentData] = useState<CommentData>({
    name: '',
    email: '',
    body: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleReset = () => {
    setCommentData({
      name: '',
      email: '',
      body: '',
    });
    setErrors({
      ...errors,
      nameError: '',
      emailError: '',
      bodyError: '',
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedName = commentData.name.trim();
    const normalizedEmail = commentData.email.trim();
    const normalizedBody = commentData.body.trim();


    let nameError = '';
    let emailError = '';
    let bodyError = '';

    if (!normalizedName) {
      nameError = 'Name is required';
    }

    if (!normalizedEmail) {
      emailError = 'Email is required';
    }

    if (!normalizedBody) {
      bodyError = 'Enter some text';
    }

    if (nameError || emailError || bodyError) {
      setErrors({
        ...errors,
        nameError,
        emailError,
        bodyError,
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
        setErrors({
          nameError: '',
          emailError: '',
          bodyError: '',
          serverError: '',
        });

        setCommentData({
          ...commentData,
          body: '',
        });
      })
      .catch(() => {
        setErrors({
          ...errors,
          serverError: 'Unable to add a comment',
        });
      })
      .finally(() => setIsLoading(false));
  };

  const handleNameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrors({
      ...errors,
      nameError: '',
    });

    setCommentData({
      ...commentData,
      name: event.target.value,
    });
  };

  const handleEmailChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrors({
      ...errors,
      emailError: '',
    });

    setCommentData({
      ...commentData,
      email: event.target.value,
    });
  };

  const handleBodyChanged = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setErrors({
      ...errors,
      bodyError: '',
    });

    setCommentData({
      ...commentData,
      body: event.target.value,
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
            onChange={handleNameChanged}
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', {
              'is-danger': !!errors.nameError,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errors.nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.nameError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.nameError}
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
            onChange={handleEmailChanged}
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', {
              'is-danger': !!errors.emailError,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errors.emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.emailError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.emailError}
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
            onChange={handleBodyChanged}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={cn('textarea', {
              'is-danger': !!errors.bodyError,
            })}
          />
        </div>

        {errors.bodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.bodyError}
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
      {!!errors.serverError && (
        <ErrorMessage errorMessage={errors.serverError} />
      )}
    </form>
  );
};
