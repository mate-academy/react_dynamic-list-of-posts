import classNames from 'classnames';
import React, { useState } from 'react';
import { IComment } from '../types/Comment';
// import { IComment } from '../types/Comment';
import { IPost } from '../types/Post';
import { createComment } from '../utils/fetchClient';

interface Props {
  post: IPost;
  handleAddComment: (comment: IComment) => void;
}

export const NewCommentForm: React.FC<Props> = (
  { post, handleAddComment },
) => {
  const [inputName, setInputName] = useState<string>('');
  const [inputEmail, setInutEmail] = useState<string>('');
  const [inputComment, setInputComment] = useState<string>('');

  const [isErrorName, setIsErrorName] = useState<boolean>(false);
  const [isErrorEmail, setIsErrorEmail] = useState<boolean>(false);
  const [isErrorComment, setIsErrorComment] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const changeInputText = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setIsErrorName(false);
        setInputName(value);
        break;
      case 'email':
        setIsErrorEmail(false);
        setInutEmail(value);
        break;
      case 'body':
        setIsErrorComment(false);
        setInputComment(value);
        break;
      default:
    }
  };

  const clearErrors = () => {
    setIsErrorName(false);
    setIsErrorEmail(false);
    setIsErrorComment(false);
  };

  const clearFrom = () => {
    setInputName('');
    setInutEmail('');
    setInputComment('');

    clearErrors();
  };

  const checkAllInputs = () => {
    let error = false;

    if (!inputName) {
      setIsErrorName(true);
      error = true;
    }

    if (!inputEmail) {
      setIsErrorEmail(true);
      error = true;
    }

    if (!inputComment) {
      setIsErrorComment(true);
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
            className={classNames('input', { 'is-danger': isErrorComment })}
            value={inputComment}
            onChange={(event) => {
              changeInputText(event);
            }}
          />
        </div>

        {isErrorComment && (
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
