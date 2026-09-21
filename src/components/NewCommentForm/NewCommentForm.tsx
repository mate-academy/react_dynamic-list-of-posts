import React, { FormEvent, useState } from 'react';

import cn from 'classnames';

import { Comment as CommentType, CommentData } from '../../types/Comment';
import { createComment } from '../../api/Comments';

type Props = {
  selectedPostId: number | undefined;
  onFormSubmit: (newComment: CommentType) => void;
};

const DEFAULT_FORM_DATA = {
  name: '',
  email: '',
  body: '',
};

const DEFAULT_FORM_ERROR_MESSAGES = {
  name: '',
  email: '',
  body: '',
};

const validateName = (name: string) => {
  if (!name.trim()) {
    return 'Name is required';
  }

  return '';
};

const validateEmail = (email: string) => {
  if (!email.trim()) {
    return 'Email is required';
  }

  return '';
};

const validateBody = (body: string) => {
  if (!body.trim()) {
    return 'Enter some text';
  }

  return '';
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  onFormSubmit,
}) => {
  const [formData, setFormData] = useState<CommentData>(DEFAULT_FORM_DATA);
  const [formErrorMessages, setFormErrorMessages] = useState<CommentData>(
    DEFAULT_FORM_ERROR_MESSAGES,
  );

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormDataChange = (key: keyof CommentData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
    setFormErrorMessages(prev => ({
      ...prev,
      [key]: '',
    }));
    setErrorMessage('');
  };

  const handleClear = () => {
    setFormData(DEFAULT_FORM_DATA);
    setFormErrorMessages(DEFAULT_FORM_ERROR_MESSAGES);
    setErrorMessage('');
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newFormErrorMessages: CommentData = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      body: validateBody(formData.body),
    };

    setFormErrorMessages(newFormErrorMessages);

    const hasError = Object.values(newFormErrorMessages).some(
      message => message !== '',
    );

    if (hasError) {
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    const newComment: CommentData = {
      ...formData,
      postId: selectedPostId,
    };

    createComment(newComment)
      .then(response => {
        setFormData(prev => ({
          ...prev,
          body: '',
        }));

        onFormSubmit(response);
      })
      .catch(() => setErrorMessage('Failed to create a comment.'))
      .finally(() => setIsLoading(false));
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={event => handleFormSubmit(event)}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={formData.name}
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', { 'is-danger': formErrorMessages.name })}
            onChange={event =>
              handleFormDataChange(
                event.target.name as keyof CommentData,
                event.target.value,
              )
            }
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {formErrorMessages.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formErrorMessages.name && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {formErrorMessages.name}
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={formData.email}
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', { 'is-danger': formErrorMessages.email })}
            onChange={event =>
              handleFormDataChange(
                event.target.name as keyof CommentData,
                event.target.value,
              )
            }
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {formErrorMessages.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formErrorMessages.email && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {formErrorMessages.email}
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            value={formData.body}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={cn('textarea', { 'is-danger': formErrorMessages.body })}
            onChange={event =>
              handleFormDataChange(
                event.target.name as keyof CommentData,
                event.target.value,
              )
            }
          />
        </div>

        {formErrorMessages.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {formErrorMessages.body}
          </p>
        )}
      </div>

      {errorMessage && (
        <p className="help is-danger" data-cy="FormErrorMessage">
          {errorMessage}
        </p>
      )}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', { 'is-loading': isLoading })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
