import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { InputName } from '../enums/InputName';
import { Comment } from '../types/Comment';

type Props = {
  postId: number;
  addNewComment: (comment: Comment) => Promise<void>;
  isCommentSending: boolean;
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  addNewComment,
  isCommentSending,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);

  const [isNameError, setIsNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isTextError, setIsTextError] = useState(false);

  const validateEmail = useCallback((emailInput: string) => {
    const reg = /^[A-Za-z0-9_!#$%&'*+?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;

    return reg.test(emailInput);
  }, [email]);

  const checkFormData = useCallback(() => {
    if (!name.trim()) {
      setName('');
      setIsNameError(true);
    }

    if (!email.trim()) {
      setEmail('');
      setIsEmailError(true);
    }

    if (!text.trim()) {
      setText('');
      setIsTextError(true);
    }
  }, [name, email, text]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmit(true);
    checkFormData();

    if (!(name.trim() && validateEmail(email) && text.trim())) {
      return;
    }

    const newComment: Comment = {
      id: 0,
      postId,
      name,
      email,
      body: text,
    };

    addNewComment(newComment);
    setText('');
    setIsSubmit(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const inputName = e.currentTarget.name;
    const inputValue = e.currentTarget.value;

    switch (inputName) {
      case InputName.NAME:
        setName(inputValue);
        setIsNameError(false);
        break;

      case InputName.EMAIL:
        setEmail(inputValue);
        setIsEmailError(false);
        break;

      case InputName.BODY:
        setText(inputValue);
        setIsTextError(false);
        break;
      default:
        throw new Error('Uknown input name');
    }
  };

  const handleClear = useCallback(() => {
    setEmail('');
    setName('');
    setText('');
    setIsEmailError(false);
    setIsNameError(false);
    setIsTextError(false);
    setIsSubmit(false);
  }, [isSubmit]);

  const isEmailValidError = isSubmit && !isEmailError && !validateEmail(email);

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
            className={classNames(
              'input',
              { 'is-danger': isNameError },
            )}
            value={name}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isNameError && (
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
            className={classNames(
              'input',
              { 'is-danger': isEmailError },
            )}
            value={email}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isEmailError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        )}
        {isEmailValidError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Invalid email
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
            className={classNames(
              'textarea',
              { 'is-danger': isTextError },
            )}
            value={text}
            onChange={handleChange}
          />
        </div>

        {isTextError && (
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
              { 'is-loading': isCommentSending },
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
