import React, { useState } from 'react';
import { CommentData, Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';
import classNames from 'classnames';

interface Props {
  postId: number;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

const ClearErrors = {
  name: false,
  email: false,
  body: false,
  adding: false,
};

export const NewCommentForm: React.FC<Props> = ({ postId, setComments }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newCommentData, setNewCommentData] = useState<CommentData>({
    name: '',
    email: '',
    body: '',
  });
  const [errors, setErrors] = useState(ClearErrors);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors = {
      name: !newCommentData.name.trim(),
      email: !newCommentData.email.trim(),
      body: !newCommentData.body.trim(),
      adding: false,
    };

    setErrors(newErrors);

    if (newErrors.name || newErrors.email || newErrors.body) {
      return;
    }

    setIsAdding(true);
    client
      .post<Comment>(`/comments`, { postId, ...newCommentData })
      .then(newComment => {
        setComments(prevComments => [...prevComments, newComment]);
        setNewCommentData({ ...newCommentData, body: '' });
      })
      .catch(() => {
        setErrors({ ...newErrors, adding: true });
      })
      .finally(() => {
        setIsAdding(false);
      });
  };

  const handleClear = (event: React.MouseEvent) => {
    event.preventDefault();
    setNewCommentData({ name: '', email: '', body: '' });
    setErrors(ClearErrors);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      {errors.adding && (
        <p className="help is-danger" data-cy="ErrorMessage">
          Error Adding Comment
        </p>
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
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': errors.name })}
            value={newCommentData.name}
            onChange={e => {
              setNewCommentData({ ...newCommentData, name: e.target.value });
              setErrors({ ...errors, name: false });
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.name && (
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
            className={classNames('input', { 'is-danger': errors.email })}
            value={newCommentData.email}
            onChange={e => {
              setNewCommentData({ ...newCommentData, email: e.target.value });
              setErrors({ ...errors, email: false });
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.email && (
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
            className={classNames('textarea', { 'is-danger': errors.body })}
            value={newCommentData.body}
            onChange={e => {
              setNewCommentData({ ...newCommentData, body: e.target.value });
              setErrors({ ...errors, body: false });
            }}
          />
        </div>

        {errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', { 'is-loading': isAdding })}
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
