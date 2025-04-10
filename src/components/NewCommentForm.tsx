import React, { useRef, useState } from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  postId: Post['id'];
  onCommentAdd: (newComment: Omit<Comment, 'id'>) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({ onCommentAdd, postId }) => {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [nameErr, setNameErr] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [emailErr, setEmailErr] = useState(false);
  const [commentBody, setCommentBody] = useState('');
  const [commentErr, setCommentErr] = useState(false);

  const handleClearErrors = () => {
    setNameErr(false);
    setEmailErr(false);
    setCommentErr(false);
  };

  const handleClearFormClick = () => {
    if (nameInputRef?.current) {
      nameInputRef.current.value = '';
    }

    if (emailInputRef?.current) {
      emailInputRef.current.value = '';
    }

    setCommentBody('');

    handleClearErrors();
  };

  const handleClearAfterSubmit = () => {
    setCommentBody('');

    handleClearErrors();
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = nameInputRef?.current?.value?.trim() || '';
    const email = emailInputRef?.current?.value?.trim() || '';
    const body = commentBody.trim();

    if (!name) {
      setNameErr(true);
    }

    if (!email) {
      setEmailErr(true);
    }

    if (!body) {
      setCommentErr(true);
    }

    if (!(name && email && body)) {
      return;
    }

    const newComment = {
      postId,
      name,
      email,
      body,
    };

    setIsFormSubmitting(true);
    try {
      await onCommentAdd(newComment);
      handleClearAfterSubmit();
    } catch {
    } finally {
      setIsFormSubmitting(false);
    }
  };

  const handleChangeCommentBody = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCommentBody(event.target.value);
    setCommentErr(false);
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
            className={classNames('input', { 'is-danger': nameErr })}
            ref={nameInputRef}
            onChange={() => setNameErr(false)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameErr && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameErr && (
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
            className={classNames('input', { 'is-danger': emailErr })}
            ref={emailInputRef}
            onChange={() => setEmailErr(false)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailErr && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailErr && (
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
            className={classNames('textarea', { 'is-danger': commentErr })}
            value={commentBody}
            onChange={handleChangeCommentBody}
          />
        </div>

        {commentErr && (
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
              'is-loading': isFormSubmitting,
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
            onClick={handleClearFormClick}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
