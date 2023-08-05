import React, { useState } from 'react';
import classNames from 'classnames';
import { Comment } from '../types/Comment';

type Props = {
  addComment: ({
    postId,
    name,
    email,
    body,
  }: Omit<Comment, 'id'>) => Promise<void>;
  postId: number;
};

export const NewCommentForm: React.FC<Props> = ({
  addComment,
  postId,
}) => {
  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    text: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [textError, setTextError] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormFields(prevFormFields => ({
      ...prevFormFields,
      name: event.target.value,
    }));
    setNameError(false);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormFields(prevFormFields => ({
      ...prevFormFields,
      email: event.target.value,
    }));
    setEmailError(false);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormFields(prevFormFields => ({
      ...prevFormFields,
      text: event.target.value,
    }));
    setTextError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isNameValidate = !formFields.name.trim();
    const isEmailValidate = !formFields.email.trim();
    const isTextValidate = !formFields.text.trim();

    if (isNameValidate) {
      setNameError(true);
    }

    if (isEmailValidate) {
      setEmailError(true);
    }

    if (isTextValidate) {
      setTextError(true);
    }

    if (isNameValidate || isEmailValidate || isTextValidate) {
      return;
    }

    setIsLoading(true);

    addComment({
      postId,
      name: formFields.name,
      email: formFields.email,
      body: formFields.text,
    })
      .finally(() => {
        setIsLoading(false);
        setFormFields(prevFormFields => ({
          ...prevFormFields,
          text: '',
        }));
      });
  };

  const clearErrors = () => {
    setEmailError(false);
    setNameError(false);
    setTextError(false);
  };

  const handleClear = () => {
    clearErrors();
    setFormFields({
      name: '',
      email: '',
      text: '',
    });
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={(event) => handleSubmit(event)}>
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
            value={formFields.name}
            onChange={handleNameChange}
            className={classNames(
              'input',
              { 'is-danger': nameError },
            )}
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
            value={formFields.email}
            onChange={handleEmailChange}
            className={classNames(
              'input',
              { 'is-danger': emailError },
            )}
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
            value={formFields.text}
            onChange={handleBodyChange}
            className={classNames(
              'textarea',
              { 'is-danger': textError },
            )}
          />
        </div>

        {textError && (
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
              'button',
              'is-link',
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
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
