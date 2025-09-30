import classNames from 'classnames';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Post } from '../types/Post';

type Props = {
  openedPost: Post;
  isLoading: boolean;
  addCommentHandler: (
    postId: number,
    name: string,
    email: string,
    body: string,
  ) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({
  openedPost,
  isLoading,
  addCommentHandler,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [commentError, setCommentError] = useState(false);

  const clearAllHandler = () => {
    setName('');
    setEmail('');
    setCommentText('');
    setNameError(false);
    setEmailError(false);
    setCommentError(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const normalizedName = name.trim();
    const normalizedEmail = email.trim();
    const normalizedComment = commentText.trim();

    if (!normalizedName) {
      setNameError(true);
    }

    if (!normalizedEmail) {
      setEmailError(true);
    }

    if (!normalizedComment) {
      setCommentError(true);
    }

    if (normalizedName && normalizedEmail && normalizedComment) {
      try {
        await addCommentHandler(
          openedPost.id,
          normalizedName,
          normalizedEmail,
          normalizedComment,
        );
        setCommentText('');
      } catch(e) {
        console.error('Failed to add comment', e);
      }
    }
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
            className={classNames('input', { 'is-danger': nameError })}
            value={name}
            onChange={e => {
              setName(e.target.value);
              if (nameError) {
                setNameError(false);
              }
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
              setEmail(e.target.value);
              if (emailError) {
                setEmailError(false);
              }
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
            className={classNames('textarea', { 'is-danger': commentError })}
            value={commentText}
            onChange={e => {
              setCommentText(e.target.value);
              if (commentError) {
                setCommentError(false);
              }
            }}
          />
        </div>

        {commentError && (
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
            onClick={clearAllHandler}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};

NewCommentForm.propTypes = {
  openedPost: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  addCommentHandler: PropTypes.func.isRequired,
};
