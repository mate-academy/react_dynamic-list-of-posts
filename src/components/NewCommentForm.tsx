import classNames from 'classnames';
import React, { useState } from 'react';
import { Comment } from '../types/Comment';

type Props = {
  isLoading: boolean;
  postId: number;
  onAddComment: (newComment: Omit<Comment, 'id'>) => void;
};

export const NewCommentForm: React.FC<Props> = (
  {
    isLoading,
    postId,
    onAddComment,
  },
) => {
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [errEmptyAuthorName, setErrEmptyAuthorName] = useState(false);
  const [errEmptyAuthorEmail, setErrEmptyAuthorEmail] = useState(false);
  const [errEmptynewCommentText, setErrEmptyNewCommentText] = useState(false);

  const onChangeAuthorName = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setErrEmptyAuthorName(false);
    setAuthorName(event.target.value);
  };

  const onChangeAuthorEmail = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setErrEmptyAuthorEmail(false);
    setAuthorEmail(event.target.value);
  };

  const onChangeCommentText = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setErrEmptyNewCommentText(false);
    setNewCommentText(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !authorName || !authorEmail || !newCommentText
    ) {
      setErrEmptyAuthorEmail(!authorEmail);
      setErrEmptyAuthorName(!authorName);
      setErrEmptyNewCommentText(!newCommentText);

      return;
    }

    const newComment = {
      postId,
      name: authorName,
      email: authorEmail,
      body: newCommentText,
    };

    onAddComment(newComment);
    setNewCommentText('');
  };

  const onClickCleanBtn = () => {
    setAuthorName('');
    setAuthorEmail('');
    setNewCommentText('');
    setErrEmptyAuthorEmail(false);
    setErrEmptyAuthorName(false);
    setErrEmptyNewCommentText(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={onSubmit}>
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
            className={classNames(
              'input', { 'is-danger': errEmptyAuthorName },
            )}
            value={authorName}
            onChange={onChangeAuthorName}
            required
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {errEmptyAuthorName && (
            <>
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            </>
          )}
        </div>

        {errEmptyAuthorName && (
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
            type="emeil"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
            className={classNames(
              'input', { 'is-danger': errEmptyAuthorEmail },
            )}
            value={authorEmail}
            onChange={onChangeAuthorEmail}
            required
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errEmptyAuthorEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errEmptyAuthorEmail && (
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
            className={classNames(
              'textarea', { 'is-danger': errEmptynewCommentText },
            )}
            value={newCommentText}
            onChange={onChangeCommentText}
            required
          />
        </div>

        {errEmptynewCommentText && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
              'button',
              'is-link',
              { 'is-loading': isLoading },
            )}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={onClickCleanBtn}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
