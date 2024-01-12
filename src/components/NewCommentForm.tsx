import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { createComment } from '../api/posts';
import { DispatchContext } from '../PostsContext';
import { ReducerType } from '../types/ReducerType';

const defaultComment = {
  name: '',
  email: '',
  body: '',
};

const defaultErrors = {
  nameError: false,
  emailError: false,
  bodyError: false,
};

interface Props {
  postId: number
}

export const NewCommentForm: React.FC<Props> = ({ postId }) => {
  const dispatch = useContext(DispatchContext);
  const [comment, setComment] = useState(defaultComment);
  const [inputErrors, setInputErrors] = useState(defaultErrors);
  const [isLoading, setIsLoading] = useState(false);

  const {
    name,
    email,
    body,
  } = comment;

  const {
    nameError,
    emailError,
    bodyError,
  } = inputErrors;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;

    setInputErrors((c) => ({ ...c, [`${e.target.name}Error`]: false }));

    setComment(c => ({
      ...c,
      [e.target.name]: value.trim(),
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = { ...defaultErrors };

    errors.nameError = !name;
    errors.emailError = !/\S+@\S+\.\S+/.test(email);
    errors.bodyError = !body;

    setInputErrors(errors);

    if (!(JSON.stringify(defaultErrors) === JSON.stringify(errors))) {
      return;
    }

    setIsLoading(true);

    createComment({ ...comment, postId })
      .then((item) => {
        dispatch({
          type: ReducerType.AddComment,
          payload: item,
        });
        setComment({ ...comment, body: '' });
      })
      .finally(() => setIsLoading(false));
  };

  const handleButtonClear = () => {
    setComment(defaultComment);
    setInputErrors(defaultErrors);
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
            className={classNames('input', { 'is-danger': nameError })}
            value={name}
            onChange={handleInputChange}
          />

          {
            nameError
              ? (
                <span
                  className="icon is-small is-right has-text-danger"
                  data-cy="ErrorIcon"
                >
                  <i className="fas fa-exclamation-triangle" />
                </span>
              ) : (
                <span className="icon is-small is-left">
                  <i className="fas fa-user" />
                </span>
              )
          }
        </div>

        {nameError && (
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
            className={classNames('input', { 'is-danger': emailError })}
            value={email}
            onChange={handleInputChange}
          />

          {
            emailError
              ? (
                <span
                  className="icon is-small is-right has-text-danger"
                  data-cy="ErrorIcon"
                >
                  <i className="fas fa-exclamation-triangle" />
                </span>
              ) : (
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope" />
                </span>
              )
          }
        </div>

        {emailError && (
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
            className={classNames('input', { 'is-danger': bodyError })}
            value={body}
            onChange={handleInputChange}
          />
        </div>

        {bodyError && (
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
            onClick={handleButtonClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
