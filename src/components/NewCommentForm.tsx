import React, { useState } from 'react';
import classNames from 'classnames';
import { addComment } from '../Api/comments';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { isValidEmail } from '../utils/EmailValidation';
import { ErrorMessage } from '../types/ErrorMessage';

type Props = {
  selectedPost: Post | null
  onAdd: (comment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({ selectedPost, onAdd }) => {
  const initComment = {
    postId: selectedPost?.id,
    name: '',
    email: '',
    body: '',
  };

  const [comment, setComment] = useState(initComment);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    isName: true,
    isEmail: true,
    isEmailValid: true,
    isBody: true,
  });

  const {
    isName,
    isEmail,
    isEmailValid,
    isBody,
  } = validationErrors;

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    const errorName = `is${name[0].toUpperCase()}${name.slice(1, name.length)}`;

    setComment((prevState) => ({ ...prevState, [name]: value }));
    setValidationErrors((prevState) => ({ ...prevState, [errorName]: true }));
    if (name === 'email') {
      setValidationErrors(
        (prevState) => ({ ...prevState, isEmailValid: true }),
      );
    }
  };

  const { name, email, body } = comment;

  const clearForm = () => {
    setValidationErrors({
      isName: true,
      isEmail: true,
      isEmailValid: true,
      isBody: true,
    });
    setComment(initComment);
    setIsError(false);
  };

  const createComment = async () => {
    const isFormValid = name.trim()
      && isValidEmail(email)
      && email.trim()
      && body.trim();

    try {
      if (isFormValid) {
        setIsButtonLoading(true);
        const newComment = await addComment(comment);

        onAdd(newComment);
        setComment((prevState) => ({ ...prevState, body: '' }));
      }
    } catch {
      setIsError(true);
    } finally {
      setIsButtonLoading(false);
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsError(false);

    const updatedValidation = {
      isName: !!name.trim(),
      isEmail: !!email.trim(),
      isEmailValid: isValidEmail(email),
      isBody: !!body.trim(),
    };

    setValidationErrors(updatedValidation);

    if (isName && isEmail && isEmailValid && isBody) {
      createComment();
    }
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleFormSubmit}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            value={name}
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames(
              'input', {
                'is-danger': !isName,
              },
            )}
            onChange={handleInputChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!isName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!isName && (
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
            value={email}
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames(
              'input', {
                'is-danger': !isEmail || !isEmailValid,
              },
            )}
            onChange={handleInputChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {(!isEmail || !isEmailValid) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!isEmail && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        )}

        {!isEmailValid && isEmail && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter Valid email
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
            value={body}
            placeholder="Type comment here"
            className={classNames(
              'textarea', {
                'is-danger': !isBody,
              },
            )}
            onChange={handleInputChange}
          />
        </div>

        {!isBody && (
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
              'button is-link', {
                'is-loading': isButtonLoading,
              },
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
            onClick={clearForm}
          >
            Clear
          </button>
        </div>
      </div>

      {isError && (
        <div
          className="notification is-danger"
          data-cy="PostsLoadingError"
        >
          {ErrorMessage.ADD}
        </div>
      )}
    </form>
  );
};
