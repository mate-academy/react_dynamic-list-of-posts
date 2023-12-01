import React, { useState } from 'react';
import classNames from 'classnames';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import * as service from '../utils/api';

type Props = {
  handleCommentAdd: (value: Comment) => void;
  selectedPost: Post,
};

export const NewCommentForm: React.FC<Props> = ({
  handleCommentAdd,
  selectedPost,
}) => {
  const [authorName, setAuthorName] = useState('');
  const [isNameError, setIsNameError] = useState(false);

  const [email, setEmail] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);

  const [commentText, setCommentText] = useState('');
  const [isCommentError, setIsCommentError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isResponseError, setIsResponseError] = useState(false);

  const handleClear = () => {
    setIsLoading(false);
    setIsResponseError(false);
    setAuthorName('');
    setEmail('');
    setCommentText('');
    setIsNameError(false);
    setIsEmailError(false);
    setIsCommentError(false);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorName(event.target.value);
    setIsNameError(false);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setIsEmailError(false);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCommentText(event.target.value);
    setIsCommentError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!authorName.trim()) {
      setIsNameError(true);
    }

    if (!email.trim()) {
      setIsEmailError(true);
    }

    if (!commentText.trim()) {
      setIsCommentError(true);
    }

    if (!authorName.trim() || !commentText.trim() || !email.trim()) {
      return;
    }

    setIsNameError(false);
    setIsEmailError(false);
    setIsCommentError(false);
    setIsLoading(true);

    const newComment = {
      postId: selectedPost.id,
      name: authorName,
      email,
      body: commentText,
    };

    service.addComment(newComment)
      .then((resp) => {
        handleCommentAdd(resp);
        setCommentText('');
      })
      .catch(() => setIsResponseError(true))
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
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
              'is-danger': isNameError,
            })}
            value={authorName}
            onChange={handleNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {isNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isNameError && (
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
            className={classNames('input', {
              'is-danger': isEmailError,
            })}
            value={email}
            onChange={handleEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isEmailError && (
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
            className={classNames('textarea', {
              'is-danger': isCommentError,
            })}
            value={commentText}
            onChange={handleCommentChange}
          />
        </div>

        {isCommentError && (
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
            onClick={handleClear}
          >
            Clear
          </button>
        </div>

        {isResponseError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Unable to add comment, please try again.
          </p>
        )}
      </div>
    </form>
  );
};
