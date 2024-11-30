import classNames from 'classnames';
import React, { Dispatch, SetStateAction, useState } from 'react';

import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';
import { postComment } from '../../api';

type Props = {
  post: Post;
  updateComments: Dispatch<SetStateAction<Comment[]>>;
};

export const NewCommentForm: React.FC<Props> = ({ post, updateComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [commentError, setCommentError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameError('');
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailError('');
    setEmail(event.target.value);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCommentError('');
    setComment(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedComment = comment.trim();

    let hasErrors = false;

    if (!trimmedName) {
      hasErrors = true;
      setNameError('Name is required');
    }

    if (!trimmedEmail) {
      hasErrors = true;
      setEmailError('Email is required');
    }

    if (!trimmedComment) {
      hasErrors = true;
      setCommentError('Enter some text');
    }

    if (hasErrors) {
      return;
    }

    setIsLoading(true);
    postComment({ postId: post.id, name, email, body: comment })
      .then(receivedComment => {
        updateComments(curr => [...curr, receivedComment as Comment]);
        setComment('');
      })
      .finally(() => setIsLoading(false));
  };

  const reset = () => {
    setName('');
    setEmail('');
    setComment('');
    setNameError('');
    setEmailError('');
    setCommentError('');
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
            onChange={handleNameChange}
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
            {nameError}
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
            onChange={handleEmailChange}
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
            {emailError}
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
            value={comment}
            onChange={handleCommentChange}
          />
        </div>

        {commentError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {commentError}
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
            onClick={reset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
