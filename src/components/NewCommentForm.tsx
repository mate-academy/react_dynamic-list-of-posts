import classNames from 'classnames';
import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import { ErrorMessage } from './ErrorMessage';
import { ErrorIcon } from './ErrorIcon';

type Props = {
  postId: number;
  addCommentOnServer: (newComment: Comment) => Promise<void>;
};

type FocusEventType =
  | React.FocusEvent<HTMLInputElement, Element>
  | React.FocusEvent<HTMLTextAreaElement, Element>;

type ChangeEventType =
  | React.ChangeEvent<HTMLTextAreaElement>
  | React.ChangeEvent<HTMLInputElement>;

export const NewCommentForm: React.FC<Props> = ({
  postId,
  addCommentOnServer,
}) => {
  const [validationErrors, setValidationErrors] = useState({
    name: false,
    email: false,
    text: false,
  });
  const [valuesFrom, setValuesForm] = useState({
    name: '',
    email: '',
    text: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const { name, email, text } = valuesFrom;
  const { name: nameErr, email: emailErr, text: textErr } = validationErrors;

  const validation = () => {
    let isPassValid = true;

    if (!name.trim()) {
      setValidationErrors(prevErrors => ({ ...prevErrors, name: true }));
      isPassValid = false;
    }

    if (!text.trim()) {
      setValidationErrors(prevErrors => ({ ...prevErrors, text: true }));
      isPassValid = false;
    }

    if (!email.trim()) {
      setValidationErrors(prevErrors => ({ ...prevErrors, email: true }));
      isPassValid = false;
    }

    if (!isPassValid) {
      return false;
    }

    return true;
  };

  const addComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validation()) {
      return;
    }

    setIsLoading(true);

    addCommentOnServer({
      id: 0,
      name,
      postId,
      body: text,
      email,
    })
      .then(() => {
        setValuesForm(prev => ({ ...prev, text: '' }));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const clear = () => {
    setValidationErrors({ name: false, email: false, text: false });
    setValuesForm({ name: '', email: '', text: '' });
  };

  const handleFocus = (e: FocusEventType) => {
    switch (e.target.name) {
      case 'name':
        setValidationErrors(prevErrors => ({
          ...prevErrors,
          name: false,
        }));
        break;
      case 'email':
        setValidationErrors(prevErrors => ({
          ...prevErrors,
          email: false,
        }));

        break;

      default:
        setValidationErrors(prevErrors => ({
          ...prevErrors,
          text: false,
        }));
        break;
    }
  };

  const handleChange = (e: ChangeEventType) => {
    switch (e.target.name) {
      case 'name':
        setValuesForm(prev => ({ ...prev, name: e.target.value }));
        break;
      case 'email':
        setValuesForm(prev => ({ ...prev, email: e.target.value }));
        break;

      default:
        setValuesForm(prev => ({ ...prev, text: e.target.value }));
        break;
    }
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={addComment}>
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
              'is-danger': nameErr,
            })}
            onFocus={handleFocus}
            onChange={handleChange}
            value={name}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameErr && <ErrorIcon />}
        </div>

        {nameErr && <ErrorMessage title="Name is required" />}
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
              'is-danger': emailErr,
            })}
            onFocus={handleFocus}
            onChange={handleChange}
            value={email}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailErr && <ErrorIcon />}
        </div>

        {emailErr && <ErrorMessage title="Email is required" />}
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
              'is-danger': textErr,
            })}
            onFocus={handleFocus}
            onChange={handleChange}
            value={text}
          />
        </div>

        {textErr && <ErrorMessage title="Enter some text" />}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
              'is-loading': isLoading,
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
            onClick={clear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
