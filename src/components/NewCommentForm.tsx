import classNames from 'classnames';
import React, { useState } from 'react';
import { CommentData } from '../types/Comment';

type Props = {
  onSubmit: (data: CommentData) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({ onSubmit }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [value, setValue] = useState({
    name: '',
    email: '',
    body: '',
  });

  const [isError, setIsError] = useState({
    name: false,
    email: false,
    body: false,
  });

  const clearForm = () => {
    setIsError({
      name: false,
      email: false,
      body: false,
    });

    setValue({
      name: '',
      email: '',
      body: '',
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!value.name || !value.email || !value.body) {
      setIsError({
        name: !value.name,
        email: !value.email,
        body: !value.body,
      });

      setIsSubmit(false);
    } else {
      setIsSubmit(true);
      await onSubmit(value);
      setValue(current => ({ ...current, body: '' }));
      setIsSubmit(false);
    }
  };

  const handleChange
  = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsError({
      name: false,
      email: false,
      body: false,
    });

    setValue(current => {
      const { value: fieldValue, name: fieldName } = event.target;

      return {
        ...current,
        [fieldName]: fieldValue,
      };
    });
  };

  const {
    name: nameError,
    email: emailError,
    body: bodyError,
  } = isError;

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
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
            className={classNames('input', { 'is-danger': nameError })}
            value={value.name}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}

        </div>

        {nameError && (
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
            className={classNames('input', { 'is-danger': emailError })}
            value={value.email}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}

        </div>

        {emailError && (
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
            className={classNames('textarea', { 'is-danger': bodyError })}
            value={value.body}
            onChange={handleChange}
          />
        </div>

        {bodyError && (
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
              'is-loading': isSubmit,
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
            onClick={clearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
