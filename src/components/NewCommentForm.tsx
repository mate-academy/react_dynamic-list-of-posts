import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { IComment } from '../types/Comment';
import { ErrorTypes } from '../types/ErrorTypes';
import { IPost } from '../types/Post';
import { createComment } from '../utils/fetchClient';

interface Props {
  post: IPost;
  handleAddComment: (comment: IComment) => void;
}

interface Errors {
  errorName: ErrorTypes | null;
  errorEmail: ErrorTypes | null;
  errorComment: ErrorTypes | null;
}

export const NewCommentForm: React.FC<Props> = (
  { post, handleAddComment },
) => {
  const [inputData, setInputData] = useState({
    inputName: '',
    inputEmail: '',
    inputComment: '',
  });

  const { inputName, inputEmail, inputComment } = inputData;

  const [errors, setErrors] = useState<Errors>({
    errorName: null,
    errorEmail: null,
    errorComment: null,
  });

  const { errorName, errorEmail, errorComment } = errors;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const changeInputText = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setErrors((prev) => ({ ...prev, errorName: null }));
        setInputData((prev) => ({ ...prev, inputName: value }));
        break;
      case 'email':
        setErrors((prev) => ({ ...prev, errorEmail: null }));
        setInputData((prev) => ({ ...prev, inputEmail: value }));
        break;
      case 'body':
        setErrors((prev) => ({ ...prev, errorComment: null }));
        setInputData((prev) => ({ ...prev, inputComment: value }));
        break;
      default:
    }
  };

  const clearErrors = useCallback(() => {
    setErrors({
      errorName: null,
      errorEmail: null,
      errorComment: null,
    });
  }, []);

  const clearFrom = useCallback(() => {
    setInputData({
      inputName: '',
      inputEmail: '',
      inputComment: '',
    });

    clearErrors();
  }, []);

  const checkAllInputs = () => {
    let error = false;

    if (!inputName) {
      setErrors((prev) => ({ ...prev, errorName: ErrorTypes.Name }));
      error = true;
    }

    if (!inputEmail) {
      setErrors((prev) => ({ ...prev, errorEmail: ErrorTypes.Email }));
      error = true;
    }

    if (!inputComment) {
      setErrors((prev) => ({ ...prev, errorComment: ErrorTypes.Comment }));
      error = true;
    }

    return error;
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const error = checkAllInputs();

    if (error) {
      setIsLoading(false);

      return;
    }

    const newComment = {
      postId: post.id,
      name: inputName,
      email: inputEmail,
      body: inputComment,
    };

    createComment(newComment)
      .then((data) => {
        handleAddComment(data as IComment);
        clearFrom();
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  if (isError) {
    setTimeout(() => {
      setIsError(false);
    }, 3000);
  }

  return (
    <form data-cy="NewCommentForm" onSubmit={(event) => submitForm(event)}>
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
            className={classNames('input', { 'is-danger': errorName })}
            value={inputName}
            onChange={(event) => {
              changeInputText(event);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errorName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorName && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {ErrorTypes.Name}
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
            className={classNames('input', { 'is-danger': errorEmail })}
            value={inputEmail}
            onChange={(event) => {
              changeInputText(event);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errorEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorEmail && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {ErrorTypes.Email}
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
            className={classNames('input', { 'is-danger': errorComment })}
            value={inputComment}
            onChange={(event) => {
              changeInputText(event);
            }}
          />
        </div>

        {errorComment && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {ErrorTypes.Comment}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
              'button is-link', { 'is-loading': isLoading },
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
            onClick={clearFrom}
          >
            Clear
          </button>
        </div>

        {isError && (
          <div
            className="notification is-danger"
            data-cy="PostsLoadingError"
          >
            Something went wrong!
          </div>
        )}
      </div>
    </form>
  );
};
