import classNames from 'classnames';
import React, { FormEvent, useState } from 'react';
import { createNewComment } from '../api';
import { Comment } from '../types/Comment';

type Props = {
  postId: number,
  onAddComment: (newComment: Comment) => void,
};

export const NewCommentForm: React.FC<Props> = ({ postId, onAddComment }) => {
  const [commentAuthor, setCommentAuthor] = useState('');
  const [authorsEmail, setAuthorsEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [noAuthor, setNoAuthor] = useState(false);
  const [noEmail, setNoEmail] = useState(false);
  const [noText, setNoText] = useState(false);
  const [commentIsAdding, setCommentIsAdding] = useState(false);

  const formSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!commentAuthor) {
      setNoAuthor(true);
    }

    if (!authorsEmail) {
      setNoEmail(true);
    }

    if (!commentText) {
      setNoText(true);

      return;
    }

    const newComment = {
      postId,
      name: commentAuthor,
      email: authorsEmail,
      body: commentText,
    };

    setCommentIsAdding(true);
    createNewComment(newComment)
      .then(res => onAddComment(res))
      .catch()
      .finally(() => setCommentIsAdding(false));

    setCommentText('');
  };

  const handleReset = () => {
    setCommentAuthor('');
    setAuthorsEmail('');
    setCommentText('');
    setNoAuthor(false);
    setNoEmail(false);
    setNoText(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={formSubmitHandler}>
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
              'input',
              { 'is-danger': noAuthor },
            )}
            value={commentAuthor}
            onChange={(e) => {
              setCommentAuthor(e.target.value);
              setNoAuthor(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {noAuthor && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {noAuthor && (
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
            className={classNames(
              'input',
              { 'is-danger': noEmail },
            )}
            value={authorsEmail}
            onChange={(e) => {
              setAuthorsEmail(e.target.value);
              setNoEmail(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {noEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {noEmail && (
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
              'textarea',
              { 'is-danger': noText },
            )}
            value={commentText}
            onChange={e => {
              setCommentText(e.target.value);
              setNoText(false);
            }}
          />
        </div>

        {noText && (
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
              'button is-link',
              { 'is-loading': commentIsAdding },
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
            onClick={() => handleReset()}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
