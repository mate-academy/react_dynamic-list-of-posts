import classNames from 'classnames';
import React, { useState } from 'react';
import { Post } from '../../types/Post';

type Props = {
  onSubmitNewComment: (
    postId: number,
    name: string,
    email: string,
    body: string,
  ) => void;
  post: Post | null;
  isLoading: boolean;
};

type Form = {
  name: string;
  email: string;
  text: string;
};

type FormStatus = {
  nameInput: boolean;
  emailInput: boolean;
  textInput: boolean;
};

const formDefault: Form = {
  name: '',
  email: '',
  text: '',
};

const formStatusDefault: FormStatus = {
  nameInput: false,
  emailInput: false,
  textInput: false,
};

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const NewCommentForm: React.FC<Props> = ({
  isLoading,
  onSubmitNewComment,
  post,
}) => {
  const [form, setForm] = useState<Form>(formDefault);
  const [formStatus, setFormStatus] = useState<FormStatus>(formStatusDefault);
  const { name, email, text } = form;
  const { nameInput, emailInput, textInput } = formStatus;

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setForm(prev => ({ ...prev, name: value }));
    setFormStatus(prev => ({ ...prev, nameInput: false }));
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setForm(prev => ({ ...prev, email: value }));
    setFormStatus(prev => ({ ...prev, emailInput: false }));
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    setForm(prev => ({ ...prev, text: value }));
    setFormStatus(prev => ({ ...prev, textInput: false }));
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDestruct = Object.values(form);
    const [nameValue, emailValue, textValue] = formDestruct;

    const isNameValid = !!nameValue.trim().length;
    const isEmailValid =
      !!emailValue.trim().length && emailRegex.test(emailValue);
    const isTextValid = !!textValue.trim().length;

    if (!isNameValid) {
      setFormStatus(prev => ({ ...prev, nameInput: true }));
    }

    if (!isEmailValid) {
      setFormStatus(prev => ({ ...prev, emailInput: true }));
    }

    if (!isTextValid) {
      setFormStatus(prev => ({ ...prev, textInput: true }));
    }

    if (isNameValid && isEmailValid && isTextValid && post) {
      setForm(prev => ({ ...prev, text: '' }));

      return onSubmitNewComment(post.id, name, email, text);
    }

    return;
  };

  const handleClickClearForm = () => {
    setForm(formDefault);
    setFormStatus(formStatusDefault);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmitForm}>
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
            className={classNames('input', { 'is-danger': nameInput })}
            value={name}
            onChange={handleChangeName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameInput && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameInput && (
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
            className={classNames('input', { 'is-danger': emailInput })}
            value={email}
            onChange={handleChangeEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailInput && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailInput && (
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
            className={classNames('textarea', { 'is-danger': textInput })}
            value={text}
            onChange={handleChangeText}
          />
        </div>

        {textInput && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
              isLoading: isLoading,
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
            onClick={handleClickClearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
