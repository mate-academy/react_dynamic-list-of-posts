import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import classNames from 'classnames';
import { Post } from '../types/Post';
import { createComment } from '../api/fetchPosts';

interface Props {
  post: Post | null;
  setCommentsList: (value: (prev: Comment[]) => Comment[]) => void;
  setIsError: (value: boolean) => void;
  commentsList: Comment[];
}

export const NewCommentForm: React.FC<Props> = ({
  post,
  setCommentsList,
  commentsList,
  setIsError,
}) => {
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [bodyInput, setBodyInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  const resetFormAfterSuccesSubmit = () => {
    setNameInput(nameInput);
    setEmailInput(emailInput);
    setBodyInput('');
  };

  const resetForm = () => {
    setNameInput('');
    setEmailInput('');
    setBodyInput('');
    setNameError(false);
    setEmailError(false);
    setBodyError(false);
  };

  const submitForm = async () => {
    if (!nameInput) {
      setNameError(true);
    }

    if (!emailInput) {
      setEmailError(true);
    }

    if (!bodyInput) {
      setBodyError(true);
    }

    if (!post?.id) {
      setIsError(true);

      return;
    }

    if (!nameInput || !emailInput || !bodyInput) {
      return;
    }

    setIsLoading(true);

    const newComment = {
      postId: post?.id,
      name: nameInput,
      email: emailInput,
      body: bodyInput,
    };

    try {
      await createComment(newComment);
      setCommentsList(prev => [
        ...prev,
        { ...newComment, id: commentsList.length + 1 },
      ]);
      resetFormAfterSuccesSubmit();
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={e => {
        e.preventDefault();
        submitForm();
      }}
      onReset={resetForm}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={nameInput}
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': nameError && !nameInput,
            })}
            onChange={e => {
              setNameInput(e.target.value);
              setNameError(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError && !nameInput && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameError && !nameInput && (
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
            value={emailInput}
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': emailError,
            })}
            onChange={e => {
              setEmailInput(e.target.value);
              setEmailError(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && !emailInput && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailError && !emailInput && (
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
            value={bodyInput}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('textarea', {
              'is-danger': bodyError && !bodyInput,
            })}
            onChange={e => {
              setBodyInput(e.target.value);
              setBodyError(false);
            }}
          />
        </div>

        {bodyError && !bodyInput && (
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
          {/*  */}
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
