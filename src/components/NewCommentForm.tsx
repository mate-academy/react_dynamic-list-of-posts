import React, { useState } from 'react';
import classNames from 'classnames';
import { Comment, CommentData } from '../types/Comment';
import { InputFields } from '../types/InputFields';

type Props = {
  postComment: (data: Omit<Comment, 'id'>) => Promise<void>,
  activePostId: number,
  isCommentLoading: boolean,
};

export const NewCommentForm: React.FC<Props> = ({
  postComment,
  activePostId,
  isCommentLoading,
}) => {
  const [
    inputValue,
    setInputValue,
  ] = useState<CommentData>({
    name: '',
    email: '',
    body: '',
  });

  const [inputError, setInputError] = useState({
    name: false,
    email: false,
    body: false,
  });

  function resetForm() {
    setInputValue({
      name: '',
      email: '',
      body: '',
    });

    setInputError({
      name: false,
      email: false,
      body: false,
    });
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setInputValue({
      ...inputValue,
      [name]: value,
    });

    setInputError(prev => ({
      ...prev,
      [name]: false,
    }));
  };

  const isInputFieldError = (fieldName: InputFields) => {
    return (
      !inputValue[fieldName].trim().length
    );
  };

  const validateForm = () => {
    setInputError({
      name: isInputFieldError(InputFields.Name),
      email: isInputFieldError(InputFields.Email),
      body: isInputFieldError(InputFields.Body),
    });

    const validValue = Object.values(inputValue).every(el => el.trim().length);

    return validValue;
  };

  const addComment = (
    event: (
      React.FormEvent<HTMLFormElement>
      | React.FormEvent<HTMLButtonElement>
    ),
  ) => {
    event.preventDefault();

    if (!validateForm()) {
      return null;
    }

    const dataComment = {
      ...inputValue,
      postId: activePostId,
    };

    const newCommentInPost = postComment(dataComment);

    setInputValue({
      ...inputValue,
      body: '',
    });

    return newCommentInPost;
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={(event) => addComment(event)}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            value={inputValue.name}
            onChange={(event) => handleChange(event)}
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': inputError.name })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {inputError.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {inputError.name && (
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
            value={inputValue.email}
            onChange={(event) => handleChange(event)}
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': inputError.email })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {inputError.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {inputError.email && (
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
            value={inputValue.body}
            onChange={(event) => handleChange(event)}
            placeholder="Type comment here"
            className={classNames('textarea', { 'is-danger': inputError.body })}
          />
        </div>

        {inputError.body && (
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
              { 'is-loading': isCommentLoading },
            )}
            onSubmit={(event) => addComment(event)}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={resetForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
