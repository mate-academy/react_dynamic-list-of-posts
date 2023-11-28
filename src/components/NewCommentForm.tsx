import classNames from 'classnames';

import React, { useEffect, useState } from 'react';
import { CommentData } from '../types/Comment';

type Props = {
  addComment: (inputValue: CommentData) => void,
  newPostLoading: boolean,
};

export const NewCommentForm: React.FC<Props> = ({
  addComment,
  newPostLoading,
}) => {
  const [isError, setIsError] = useState({
    nameError: false,
    emailError: false,
    textariaError: false,
  });
  const [inputValue, setInputValue] = useState<CommentData>({
    name: '',
    email: '',
    body: '',
  });

  const handleResetComment = () => {
    setInputValue({
      name: '',
      email: '',
      body: '',
    });

    setIsError({
      nameError: false,
      emailError: false,
      textariaError: false,
    });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = {
      nameError: !inputValue.name.trim(),
      emailError: !inputValue.email.trim(),
      textariaError: !inputValue.body.trim(),
    };

    setIsError(errors);

    setIsError((prevErrors) => {
      const hasErrors = Object.values(prevErrors).some((error) => error);

      if (!hasErrors) {
        addComment(inputValue);
        setInputValue({
          ...inputValue,
          body: '',
        });
      }

      return prevErrors;
    });
  };

  useEffect(() => {
    if (inputValue.name) {
      setIsError({ ...isError, nameError: false });
    }

    if (inputValue.email) {
      setIsError({ ...isError, emailError: false });
    }

    if (inputValue.body) {
      setIsError({ ...isError, textariaError: false });
    }
  }, [inputValue.name, inputValue.email, inputValue.body]);

  return (
    <form data-cy="NewCommentForm" onSubmit={handleAddComment}>
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
              { 'is-danger': isError.nameError },
            )}
            value={inputValue.name}
            onChange={(e) => setInputValue(
              { ...inputValue, name: e.target.value },
            )}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isError.nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isError.nameError && (
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
              { 'is-danger': isError.emailError },
            )}
            value={inputValue.email}
            onChange={(e) => setInputValue(
              { ...inputValue, email: e.target.value },
            )}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isError.emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isError.emailError && (
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
              { 'is-danger': isError.textariaError },
            )}
            value={inputValue.body}
            onChange={(e) => setInputValue(
              { ...inputValue, body: e.target.value },
            )}
          />
        </div>

        {isError.textariaError && (
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
              { 'is-loading': newPostLoading },
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
            onClick={handleResetComment}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
