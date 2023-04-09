import classNames from 'classnames';
import React, { FormEvent, useState } from 'react';
import { CommentData } from '../types/Comment';

type SendDataType = {
  newComment: CommentData,
  setIsButtonLoading: (IsButtonLoading: boolean) => void,
  clearText: () => void,
};

type Props = {
  addComment: (sendData: SendDataType) => void,
};

export const NewCommentForm: React.FC<Props> = ({ addComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isTextEmpty, setIsTextEmpty] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const clearText = () => setText('');

  const onSubmitNewComment = (e: FormEvent) => {
    e.preventDefault();
    setIsButtonLoading(true);

    if (!name) {
      setIsNameEmpty(true);
      setIsButtonLoading(false);
    }

    if (!email) {
      setIsEmailEmpty(true);
      setIsButtonLoading(false);
    }

    if (!text) {
      setIsTextEmpty(true);
      setIsButtonLoading(false);
    }

    if (name && email && text) {
      const newComment = {
        name,
        email,
        body: text,
      };

      const sendData = {
        newComment,
        setIsButtonLoading,
        clearText,
      };

      addComment(sendData);
    }
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setText('');

    if (isNameEmpty) {
      setIsNameEmpty(false);
    }

    if (isEmailEmpty) {
      setIsEmailEmpty(false);
    }

    if (isTextEmpty) {
      setIsTextEmpty(false);
    }
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={onSubmitNewComment}>
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
              { 'is-danger': isNameEmpty },
            )}
            value={name}
            onChange={(e) => {
              if (e.target.value && isNameEmpty) {
                setIsNameEmpty(false);
              }

              setName(e.target.value);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isNameEmpty && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isNameEmpty && (
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
              { 'is-danger': isEmailEmpty },
            )}
            value={email}
            onChange={(e) => {
              if (e.target.value && isEmailEmpty) {
                setIsEmailEmpty(false);
              }

              setEmail(e.target.value);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isEmailEmpty && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isEmailEmpty && (
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
            className={classNames(
              'textarea',
              { 'is-danger': isTextEmpty },
            )}
            value={text}
            onChange={(e) => {
              if (e.target.value && isTextEmpty) {
                setIsTextEmpty(false);
              }

              setText(e.target.value);
            }}
          />
        </div>

        {isTextEmpty && (
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
              { 'is-loading': isButtonLoading },
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
            onClick={() => clearForm()}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
