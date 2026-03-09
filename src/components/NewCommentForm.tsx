import React, { useState } from 'react';
import classNames from 'classnames';
import { Comment } from '../types/Comment';
import { createComments } from '../utils/comments';

interface Props {
  handleAddComment: (value: Comment) => void;
  postId: number;
}

export const NewCommentForm: React.FC<Props> = ({
  handleAddComment,
  postId,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(false);

  const HandleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !email || !body) {
      setSubmitting(true);

      return;
    }

    setLoading(true);
    setServerError(false);

    createComments({ postId, name, email, body })
      .then(newComment => {
        handleAddComment(newComment);
        setBody('');
        setSubmitting(false);
      })
      .catch(() => setServerError(true))
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={HandleSubmit} data-cy="NewCommentForm">
      {serverError && (
        <div className="notification is-danger" data-cy="CommentsError">
          Can&apos;t add a comment
        </div>
      )}

      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            value={name}
            onChange={e => {
              setName(e.target.value);
              setSubmitting(false);
              setServerError(false);
            }}
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': submitting && !name,
            })}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {submitting && !name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {submitting && !name && (
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
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setSubmitting(false);
              setServerError(false);
            }}
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': submitting && !email,
            })}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {submitting && !email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {submitting && !email && (
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
            value={body}
            onChange={e => {
              setBody(e.target.value);
              setSubmitting(false);
              setServerError(false);
            }}
            placeholder="Type comment here"
            className={classNames('textarea', {
              'is-danger': submitting && !body,
            })}
          />
        </div>

        {submitting && !body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', { 'is-loading': loading })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            onClick={() => {
              setName('');
              setEmail('');
              setBody('');
              setSubmitting(false);
              setServerError(false);
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
