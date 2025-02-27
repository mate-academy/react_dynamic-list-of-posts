import classNames from 'classnames';
import React, { useState } from 'react';
import { Comment } from '../types/Comment';

type Props = {
  addNewComment: (c: Omit<Comment, 'id' | 'postId'>) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({ addNewComment }) => {
  const [authorName, setAuthorName] = useState('');
  const [errorAuthorName, setErrorAuthorName] = useState(false);

  const [authorEmail, setAuthorEmail] = useState('');
  const [errorAuthorEmail, setErrorAuthorEmail] = useState(false);

  const [commentText, setCommentText] = useState('');
  const [errorCommentText, setErrorCommentText] = useState(false);

  const [loadingAddComm, setLoadingAddComm] = useState(false);

  function clearForm() {
    setAuthorName('');
    setAuthorEmail('');
    setCommentText('');

    setErrorAuthorName(false);
    setErrorAuthorEmail(false);
    setErrorCommentText(false);
  }

  async function submitComment(event: React.FormEvent) {
    event.preventDefault();

    const nameIsInvalid = authorName.trim().length === 0;
    const emailIsInvalid = authorEmail.trim().length === 0;
    const commentTextIsInvalid = commentText.trim().length === 0;

    if (nameIsInvalid) {
      setErrorAuthorName(true);
    }

    if (emailIsInvalid) {
      setErrorAuthorEmail(true);
    }

    if (commentTextIsInvalid) {
      setErrorCommentText(true);
    }

    if (nameIsInvalid || emailIsInvalid || commentTextIsInvalid) {
      return;
    }

    setLoadingAddComm(true);

    try {
      await addNewComment({
        name: authorName,
        email: authorEmail,
        body: commentText,
      });

      setCommentText('');
    } finally {
      setLoadingAddComm(false);
    }
  }

  function handleNameValue(e: React.ChangeEvent<HTMLInputElement>) {
    setAuthorName(e.target.value);
    setErrorAuthorName(false);
  }

  function handleEmailValue(e: React.ChangeEvent<HTMLInputElement>) {
    setAuthorEmail(e.target.value);
    setErrorAuthorEmail(false);
  }

  function handleTextCommentValue(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setCommentText(e.target.value);
    setErrorCommentText(false);
  }

  return (
    <form data-cy="NewCommentForm" onSubmit={submitComment}>
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
            value={authorName}
            className={classNames('input', { 'is-danger': errorAuthorName })}
            onChange={handleNameValue}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errorAuthorName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorAuthorName && (
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
            value={authorEmail}
            className={classNames('input', { 'is-danger': errorAuthorEmail })}
            onChange={handleEmailValue}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errorAuthorEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorAuthorEmail && (
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
            value={commentText}
            className={classNames('textarea', {
              'is-danger': errorCommentText,
            })}
            onChange={handleTextCommentValue}
          />
        </div>

        {errorCommentText && (
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
              'is-loading': loadingAddComm,
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
            onClick={clearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
