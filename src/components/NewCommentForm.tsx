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
  isErrorName: ErrorTypes | null;
  isErrorEmail: ErrorTypes | null;
  isErrorComment: ErrorTypes | null;
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
    isErrorName: null,
    isErrorEmail: null,
    isErrorComment: null,
  });

  const { isErrorName, isErrorEmail, isErrorComment } = errors;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const changeInputText = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setErrors((prev) => ({ ...prev, isErrorName: null }));
        setInputData((prev) => ({ ...prev, inputName: value }));
        break;
      case 'email':
        setErrors((prev) => ({ ...prev, isErrorEmail: null }));
        setInputData((prev) => ({ ...prev, inputEmail: value }));
        break;
      case 'body':
        setErrors((prev) => ({ ...prev, isErrorComment: null }));
        setInputData((prev) => ({ ...prev, inputComment: value }));
        break;
      default:
    }
  };

  const clearErrors = useCallback(() => {
    setErrors({
      isErrorName: null,
      isErrorEmail: null,
      isErrorComment: null,
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
      setErrors((prev) => ({ ...prev, isErrorName: ErrorTypes.Name }));
      error = true;
    }

    if (!inputEmail) {
      setErrors((prev) => ({ ...prev, isErrorEmail: ErrorTypes.Email }));
      error = true;
    }

    if (!inputComment) {
      setErrors((prev) => ({ ...prev, isErrorComment: ErrorTypes.Comment }));
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
      .finally(() => setIsLoading(false));
  };

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
            className={classNames('input', { 'is-danger': isErrorName })}
            value={inputName}
            onChange={(event) => {
              changeInputText(event);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isErrorName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isErrorName && (
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
            className={classNames('input', { 'is-danger': isErrorEmail })}
            value={inputEmail}
            onChange={(event) => {
              changeInputText(event);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isErrorEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isErrorEmail && (
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
            className={classNames('input', { 'is-danger': isErrorComment })}
            value={inputComment}
            onChange={(event) => {
              changeInputText(event);
            }}
          />
        </div>

        {isErrorComment && (
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
      </div>
    </form>
  );
};
