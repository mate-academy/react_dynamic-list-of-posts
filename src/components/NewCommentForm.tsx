import classNames from 'classnames';
import React, { useState } from 'react';
import * as commentServices from '../utils/comment';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { Errors } from '../utils/errors';

type Props = {
  selectedPost: Post | null;
  comments: Comment[];
  onNewComment: (newComments: Comment[]) => void;
  onError: (message: string) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPost,
  comments,
  onNewComment,
  onError,
}) => {
  const [nameInput, setNameInput] = useState('');
  const [errorNameInput, setErrorNameInput] = useState(false);

  const [mailInput, setMailInput] = useState('');
  const [errorMailInput, setErrorMailInput] = useState(false);

  const [commentInput, setCommentInput] = useState('');
  const [errorCommentInput, setErrorCommentInput] = useState(false);

  const [isAdding, setIsAdding] = useState(false);

  const handleInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorNameInput(false);
    setNameInput(event.target.value);
  };

  const handleInputMail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMailInput(false);
    setMailInput(event.target.value);
  };

  const handleInputComment = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setErrorCommentInput(false);
    setCommentInput(event.target.value);
  };

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const isNameError = nameInput.trim().length === 0;
    const isMailError = mailInput.trim().length === 0;
    const isCommentError = commentInput.trim().length === 0;

    if (isNameError) {
      setErrorNameInput(true);
    }

    if (isMailError) {
      setErrorMailInput(true);
    }

    if (isCommentError) {
      setErrorCommentInput(true);
    }

    if (isCommentError || isNameError || isMailError) {
      return;
    }

    const newComment = {
      postId: selectedPost?.id,
      name: nameInput,
      email: mailInput,
      body: commentInput,
    };

    setIsAdding(true);

    commentServices
      .postComments(newComment)
      .then(response => {
        onNewComment([...comments, response]);
        setCommentInput('');
      })
      .catch(() => onError(Errors.Loading))
      .finally(() => setIsAdding(false));
  }

  const handleClearButton = () => {
    setNameInput('');
    setMailInput('');
    setCommentInput('');

    setErrorNameInput(false);
    setErrorMailInput(false);
    setErrorCommentInput(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
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
            className={classNames('input', { 'is-danger': errorNameInput })}
            onChange={handleInputName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errorNameInput && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorNameInput && (
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
            value={mailInput}
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': errorMailInput })}
            onChange={handleInputMail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errorMailInput && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorMailInput && (
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
            value={commentInput}
            style={{ height: '82px' }}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('input', { 'is-danger': errorCommentInput })}
            onChange={handleInputComment}
          />
        </div>

        {errorCommentInput && (
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
              'is-loading': isAdding,
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
            onClick={handleClearButton}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
