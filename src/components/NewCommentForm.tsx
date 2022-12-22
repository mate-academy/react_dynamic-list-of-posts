import classNames from 'classnames';
import React, { useState } from 'react';
import { addComment } from '../api';
import { Comment } from '../types/Comment';
import { Notification } from './Notification';

type Props = {
  onCommentAdd: (comment: Comment) => void,
  postId: number,
};

export const NewCommentForm: React.FC<Props> = ({ onCommentAdd, postId }) => {
  const [name, setName] = useState('');
  const [nameIsValid, setNameIsValid] = useState(true);
  const [email, setEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [body, setBody] = useState('');
  const [bodyIsValid, setBodyIsValid] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handlerClearFields = () => {
    setName('');
    setNameIsValid(true);
    setEmail('');
    setEmailIsValid(true);
    setBody('');
    setBodyIsValid(true);
  };

  const handlerOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setValueCallback: (value: string) => void,
    setValidationCallback: (b: boolean) => void,
  ) => {
    setValidationCallback(true);
    setValueCallback(event.target.value);
  };

  const validateInput = (
    value: string,
    pattern: RegExp | undefined = undefined,
  ) => {
    if (pattern) {
      return pattern.test(value);
    }

    return value !== '';
  };

  const handlerNewCommentAdd = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const emailPattern = /\S+@\S+\.\S+/;

    const nameValidation = validateInput(name);
    const emailValidation = validateInput(email, emailPattern);
    const bodyValidation = validateInput(body);

    if (!nameValidation || !emailValidation || !bodyValidation) {
      setNameIsValid(nameValidation);
      setEmailIsValid(emailValidation);
      setBodyIsValid(bodyValidation);

      return;
    }

    setIsProcessing(true);

    try {
      const newComment = await addComment({
        id: 0,
        postId,
        name,
        email,
        body,
      });

      onCommentAdd(newComment);
      setBody('');
    } catch {
      setErrorMessage('Unable to add a comment');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handlerNewCommentAdd}>
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
              'is-danger': !nameIsValid,
            })}
            value={name}
            onChange={(event) => {
              handlerOnChange(event, setName, setNameIsValid);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!nameIsValid && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!nameIsValid && (
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
            className={classNames('input', {
              'is-danger': !emailIsValid,
            })}
            value={email}
            onChange={(event) => {
              handlerOnChange(event, setEmail, setEmailIsValid);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {!emailIsValid && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!emailIsValid && (
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
            className={classNames('textarea', {
              'is-danger': !bodyIsValid,
            })}
            value={body}
            onChange={(event) => {
              handlerOnChange(event, setBody, setBodyIsValid);
            }}
          />
        </div>

        {!bodyIsValid && (
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
              'is-loading': isProcessing,
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
            onClick={handlerClearFields}
          >
            Clear
          </button>
        </div>
      </div>

      {errorMessage && (
        <Notification
          isDanger
          message={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </form>
  );
};
