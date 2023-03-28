import classNames from 'classnames';
import React, { useState } from 'react';
import { CommentData, FormErrors } from '../types';

const initialErrors = {
  name: false,
  email: false,
  body: false,
};

type Props = {
  addComment: (comment: CommentData) => void,
  isLoading: boolean,
  commentData: CommentData,
  setCommentData: (value: React.SetStateAction<CommentData>) => void
};

export const NewCommentForm: React.FC<Props> = ({
  addComment,
  isLoading,
  commentData,
  setCommentData,
}) => {
  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const { name, email, body } = commentData;

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentData(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setErrors(prev => ({
      ...prev,
      [event.target.name]: false,
    }));
  };

  const onTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentData(prev => ({
      ...prev,
      body: event.target.value,
    }));
    setErrors(prev => ({
      ...prev,
      body: false,
    }));
  };

  const clearInputs = () => {
    setCommentData({
      email: '',
      name: '',
      body: '',
    });

    setErrors({
      name: false,
      email: false,
      body: false,
    });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name) {
      setErrors(prev => ({
        ...prev,
        name: true,
      }));
    }

    if (!email) {
      setErrors(prev => ({
        ...prev,
        email: true,
      }));
    }

    if (!body) {
      setErrors(prev => ({
        ...prev,
        body: true,
      }));
    }

    if (name && email && body) {
      addComment({
        email,
        body,
        name,
      });
    }
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={onSubmit}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={name}
            onChange={onInputChange}
            type="body"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames(
              'input',
              { 'is-danger': errors.name },
            )}
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
            value={email}
            onChange={onInputChange}
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames(
              'input',
              { 'is-danger': errors.email },
            )}
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
            value={body}
            onChange={onTextAreaChange}
            id="comment-body"
            name="text"
            placeholder="Type comment here"
            className={classNames(
              'textarea',
              { 'is-danger': errors.body },
            )}
          />
        </div>

        {errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}

      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
              'button is-link',
              { 'is-loading': isLoading },
            )}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={clearInputs}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
