import React, { useState } from 'react';

import classNames from 'classnames';
import { addComment } from '../api/addComment';
import { Comment } from '../types/Comment';

interface NewCommentFormProps {
  postId: number;
  onAdd: (comment: Comment) => void;
}

export const NewCommentForm: React.FC<NewCommentFormProps> = ({
  postId,
  onAdd,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [textError, setTextError] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendingError, setSendingError] = useState('');

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={e => {
        e.preventDefault();

        const emptyName = name.trim() === '';
        const emptyEmail = email.trim() === '';
        const emptyText = text.trim() === '';

        setNameError(emptyName);
        setEmailError(emptyEmail);
        setTextError(emptyText);

        if (emptyName || emptyEmail || emptyText) {
          return;
        }

        const newComment = {
          name,
          email,
          body: text,
        };

        setIsSending(true);
        setSendingError('');
        addComment(newComment, postId)
          .then(comment => {
            onAdd(comment);
            setText('');
          })
          .catch(() => setSendingError('Unable to post your comment'))
          .finally(() => {
            setIsSending(false);
          });
      }}
    >
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
              'is-danger': nameError,
            })}
            value={name}
            onChange={e => {
              setName(e.target.value);
              setNameError(false);
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
            className={classNames('input', {
              'is-danger': emailError,
            })}
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setEmailError(false);
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
            className={classNames('textarea', {
              'is-danger': textError,
            })}
            value={text}
            onChange={e => {
              setText(e.target.value);
              setTextError(false);
            }}
          />
        </div>
        {textError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>
      {sendingError && (
        <div className="notification is-danger" data-cy="ServerErrorMessage">
          {sendingError}
        </div>
      )}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
              'is-loading': isSending === true,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            onClick={() => {
              setName('');
              setEmail('');
              setText('');
              setNameError(false);
              setEmailError(false);
              setTextError(false);
            }}
            className="button is-link is-light"
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
