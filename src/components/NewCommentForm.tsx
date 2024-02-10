import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { createComment } from '../api/comments';
import { SelectedPostContext } from '../providers/PostProvider';
import { Comment } from '../types/Comment';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

type Props = {
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export const NewCommentForm: React.FC<Props> = ({ setComments }) => {
  const [authName, setAuthName] = useState('');
  const [authNameError, setAuthNameError] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authEmailError, setAuthEmailError] = useState('');
  const [authComment, setAuthComment] = useState('');
  const [authCommentError, setAuthCommentError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { selectedPost } = useContext(SelectedPostContext);

  const handleAuthNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthNameError('');
    setAuthName(event.target.value);
  };

  const handleAuthEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAuthEmailError('');
    setAuthEmail(event.target.value);
  };

  const handleAuthCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setAuthCommentError('');
    setAuthComment(event.target.value);
  };

  const handleClearForm = () => {
    setAuthName('');
    setAuthEmail('');
    setAuthComment('');
    setAuthNameError('');
    setAuthEmailError('');
    setAuthCommentError('');
  };

  const handleAddingComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedAuthName = authName.trim();
    const normalizedAuthEmail = authEmail.trim();
    const normalizedAuthComment = authComment.trim();

    const isEmailValid = EMAIL_REGEX.test(normalizedAuthEmail);

    if (!normalizedAuthName) {
      setAuthNameError('Name is required');
    }

    if (!normalizedAuthEmail) {
      setAuthEmailError('Email is required');
    }

    if (!isEmailValid && !!normalizedAuthEmail.length) {
      setAuthEmailError('Email should be valid');
    }

    if (!normalizedAuthComment) {
      setAuthCommentError('Enter some text');
    }

    if (
      !normalizedAuthName
      || !normalizedAuthEmail
      || !isEmailValid
      || !normalizedAuthComment
    ) {
      return;
    }

    setIsLoading(true);

    if (!selectedPost) {
      setIsLoading(false);

      return;
    }

    createComment({
      name: normalizedAuthName,
      email: normalizedAuthEmail,
      body: normalizedAuthComment,
      postId: selectedPost.id,
    })
      .then((newComment) => {
        setAuthComment('');
        setComments((prevComments) => {
          return [...prevComments, newComment];
        });
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.error('Failed to add comment');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleAddingComment}
    >
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
              'is-danger': !!authNameError.length,
            })}
            value={authName}
            onChange={handleAuthNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!!authNameError.length && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!!authNameError.length && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {authNameError}
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
              'is-danger': !!authEmailError.length,
            })}
            value={authEmail}
            onChange={handleAuthEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {!!authEmailError.length && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!!authEmailError.length && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {authEmailError}
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
              'is-danger': !!authCommentError.length,
            })}
            value={authComment}
            onChange={handleAuthCommentChange}
          />
        </div>

        {!!authCommentError.length && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {authCommentError}
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
            onClick={handleClearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
