import React, { useState } from 'react';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';
import classNames from 'classnames';

interface Props {
  postId: number;
  onAddComment: (comment: Comment) => void;
}

export const NewCommentForm: React.FC<Props> = ({ postId, onAddComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [hasErrors, setHasErrors] = useState({
    name: false,
    email: false,
    body: false,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setServerError(false);
    event.preventDefault();

    if (!name.trim() || !email.trim() || !body.trim()) {
      setHasErrors({
        name: !name.trim(),
        email: !email.trim(),
        body: !body.trim(),
      });

      return;
    }

    setIsLoading(true);
    client
      .post<Comment>('/comments', { postId, name, email, body })
      .then(newComment => {
        setIsLoading(false);
        setBody('');
        onAddComment(newComment);
      })
      .catch(() => {
        setIsLoading(false);
        setServerError(true);
      });
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setBody('');
    setHasErrors({ name: false, email: false, body: false });
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
            className={classNames('input', { 'is-danger': hasErrors.name })}
            value={name}
            onChange={event => {
              setName(event.target.value);
              setHasErrors(prevErrors => ({
                ...prevErrors,
                name: false,
              }));
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasErrors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasErrors.name && (
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
            className={classNames('input', { 'is-danger': hasErrors.email })}
            value={email}
            onChange={event => {
              setEmail(event.target.value);
              setHasErrors(prevErrors => ({
                ...prevErrors,
                email: false,
              }));
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasErrors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasErrors.email && (
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
            className={classNames('textarea', { 'is-danger': hasErrors.body })}
            value={body}
            onChange={event => {
              setBody(event.target.value);
              setHasErrors(prevErrors => ({
                ...prevErrors,
                body: false,
              }));
            }}
          />
        </div>

        {hasErrors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          {serverError && (
            <p className="help is-danger">Failed to add comment</p>
          )}
          <button
            type="submit"
            className={`button is-link ${isLoading ? 'is-loading' : ''}`}
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
