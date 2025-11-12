import classNames from 'classnames';
import React, { useState } from 'react';
import { client } from '../utils/fetchClient';

interface Props {
  postId: number;
  addComment: (newComment: Comment) => void;
}

export const NewCommentForm: React.FC<Props> = ({ postId, addComment }) => {
  const [authorName, setAuthorName] = useState('');
  const [hasErrorName, setHasErrorName] = useState(false);

  const [authorEmail, setAuthorEmail] = useState('');
  const [hasErrorEmail, setHasErrorEmail] = useState(false);

  const [commentText, setCommentText] = useState('');
  const [hasErrorText, setHasErrorText] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);

    const invalidName = !authorName.trim();
    const invalidEmail = !authorEmail.trim();
    const invalidText = !commentText.trim();

    setHasErrorName(invalidName);
    setHasErrorEmail(invalidEmail);
    setHasErrorText(invalidText);

    if (invalidName || invalidEmail || invalidText) {
      setIsLoading(false);

      return;
    }

    const data = {
      postId: postId,
      name: authorName,
      email: authorEmail,
      body: commentText,
    };

    try {
      const created = await client.post<Comment>('/comments', data);

      addComment(created);
      setCommentText('');
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setAuthorName('');
    setAuthorEmail('');
    setCommentText('');
    setHasErrorName(false);
    setHasErrorEmail(false);
    setHasErrorText(false);
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
            className={classNames('input', { 'is-danger': hasErrorName })}
            value={authorName}
            onChange={e => {
              setAuthorName(e.target.value);
              setHasErrorName(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasErrorName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasErrorName && (
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
            className={classNames('input', { 'is-danger': hasErrorEmail })}
            value={authorEmail}
            onChange={e => {
              setAuthorEmail(e.target.value);
              setHasErrorEmail(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasErrorEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasErrorEmail && (
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
            className={classNames('textarea', { 'is-danger': hasErrorText })}
            value={commentText}
            onChange={e => {
              setCommentText(e.target.value);
              setHasErrorText(false);
            }}
          />
        </div>

        {hasErrorText && (
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
      </div>
    </form>
  );
};
