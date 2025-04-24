import classNames from 'classnames';
import React, { useState } from 'react';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

type InputDataType = {
  name: string;
  email: string;
  body: string;
};

type ErrorsType = {
  nameError: boolean;
  emailError: boolean;
  bodyError: boolean;
};

type Props = {
  selectedPost: Post | null;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPost,
  setComments,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [inputCommentData, setInputCommentData] = useState<InputDataType>({
    name: '',
    email: '',
    body: '',
  });

  const { name, email, body } = inputCommentData;

  const [inputCommentErrors, setInputCommentErrors] = useState<ErrorsType>({
    nameError: false,
    emailError: false,
    bodyError: false,
  });
  const { nameError, emailError, bodyError } = inputCommentErrors;

  const clearAllErrors = () => {
    setInputCommentErrors({
      nameError: false,
      emailError: false,
      bodyError: false,
    });
    setInputCommentData({
      name: '',
      email: '',
      body: '',
    });
  };

  const handleSubmit = (submitEvent: React.FormEvent) => {
    submitEvent.preventDefault();

    const newErrors: ErrorsType = {
      nameError: name.trim() ? false : true,
      emailError: email.trim() ? false : true,
      bodyError: body.trim() ? false : true,
    };

    const hasErrors = Object.values(newErrors).some(error => error === true);

    setInputCommentErrors(newErrors);

    if (hasErrors) {
      return;
    }

    const data = {
      postId: selectedPost?.id,
      name: name.trim(),
      email: email.trim(),
      body: body.trim(),
    };

    setSubmitting(true);
    client
      .post<Comment>(`/comments`, data)
      .then(commentFromResponse => {
        setComments(currentComments => [
          ...currentComments,
          commentFromResponse,
        ]);
        setInputCommentData({ ...inputCommentData, body: '' });
      })
      .catch(() =>
        setInputCommentData({ name: name, email: email, body: body }),
      )
      .finally(() => setSubmitting(false));
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div
          className={classNames('control', 'has-icons-left has-icons-right')}
        >
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': nameError })}
            value={name}
            onChange={e => {
              setInputCommentData({
                ...inputCommentData,
                name: e.target.value,
              });
              setInputCommentErrors({
                ...inputCommentErrors,
                nameError: false,
              });
            }}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
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
            onChange={e => {
              setInputCommentData({
                ...inputCommentData,
                email: e.target.value,
              });
              setInputCommentErrors({
                ...inputCommentErrors,
                emailError: false,
              });
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
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
            className={classNames('textarea', { 'is-danger': bodyError })}
            value={body}
            onChange={e => {
              setInputCommentData({
                ...inputCommentData,
                body: e.target.value,
              });
              setInputCommentErrors({
                ...inputCommentErrors,
                bodyError: false,
              });
            }}
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
            className={classNames('button', 'is-link', {
              'is-loading': submitting,
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
            onClick={clearAllErrors}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
