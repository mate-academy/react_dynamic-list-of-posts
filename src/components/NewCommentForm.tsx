import React, { FormEvent, useCallback, useState } from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';
import { ErrorType } from '../types/ErrorType';
import { customFetch } from '../utils/fetchClient';
import { validateEmailAddress } from '../helper/helper';
import { ErrorForm } from '../types/ErrorTypesForm';
import { Comment } from '../types/Comment';

type Props = {
  post: Post | null,
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  setErrorType: React.Dispatch<React.SetStateAction<ErrorType | null>>,
};

export const NewCommentForm: React.FC<Props> = ({
  post,
  setComments,
  setErrorType,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [hasName, setHasName] = useState(true);
  const [hasEmail, setHasEmail] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [hasComment, setHasComment] = useState(true);
  const [isCommentAdd, setIsCommentAdd] = useState(false);

  const addNewComment = useCallback(async () => {
    setIsCommentAdd(true);

    try {
      if (post !== null) {
        const newComment = {
          postId: post.id,
          name,
          email,
          body: message,
        };

        const fetchComment = await customFetch.addComment(newComment);

        setMessage('');
        setComments(prevComments => [...prevComments, fetchComment]);
        setErrorType(null);
      }
    } catch (error) {
      setErrorType(ErrorType.ADD);
    } finally {
      setIsCommentAdd(false);
      setHasName(true);
      setHasEmail(true);
      setHasComment(true);
    }
  }, [name, email, message, post]);

  const handleFormSubmit = (ev: FormEvent) => {
    ev.preventDefault();

    let isNotValid;

    if (!name) {
      setHasName(false);
      isNotValid = true;
    }

    if (!email) {
      setHasEmail(false);
      isNotValid = true;
    }

    if (!validateEmailAddress(email)) {
      setIsEmailValid(false);
      isNotValid = true;
    }

    if (!message) {
      setHasComment(false);
      isNotValid = true;
    }

    if (isNotValid) {
      return;
    }

    addNewComment();
  };

  const handleClearForm = () => {
    setName('');
    setEmail('');
    setMessage('');
    setHasName(true);
    setHasEmail(true);
    setHasComment(true);
    setIsEmailValid(true);
  };

  const handleNameChange = (event: FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
    setHasName(true);
  };

  const handleEmailChange = (event: FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
    setHasEmail(true);
    setIsEmailValid(true);
  };

  const handleCommentChange = (event: FormEvent<HTMLTextAreaElement>) => {
    setMessage(event.currentTarget.value);
    setHasComment(true);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleFormSubmit}>
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
              'is-danger': !hasName,
            })}
            value={name}
            onChange={handleNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!hasName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>

          )}
        </div>
        {!hasName && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {ErrorForm.NAME}
          </p>
        )}

      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': !hasEmail,
            })}
            value={email}
            onChange={handleEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {(!hasEmail || !isEmailValid) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {(!hasEmail || !isEmailValid) && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {!hasEmail ? ErrorForm.EMAIL : ErrorForm.INVALID_EMAIL}
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
              'is-danger': !hasComment,
            })}
            value={message}
            onChange={handleCommentChange}
          />
        </div>

        {!hasComment && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {ErrorForm.COMMENT}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
              'is-loading': isCommentAdd,
            })}
            onClick={handleFormSubmit}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="button"
            className="button is-link is-light"
            onClick={handleClearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
