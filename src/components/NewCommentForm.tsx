import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { CommentData } from '../types/Comment';
import { ErrorContext, PostDataContext } from './UserContext/UserContext';
import { createComment } from '../api/comments';

export const NewCommentForm: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const postDetails = useContext(PostDataContext);
  const error = useContext(ErrorContext);

  const onAddComment = async ({ name, email, body }: CommentData) => {
    const newComment = {
      name,
      email,
      body,
      postId: postDetails.postData?.id,
    };

    createComment(newComment);
  };

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    body: false,
  });

  const [{ name, email, body }, setValues] = useState({
    name: '',
    email: '',
    body: '',
  });
  const handleChangeName = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues(current => ({ ...current, name: event.target.value }));
  };

  const handleChangeEmail = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues(current => ({ ...current, email: event.target.value }));
  };

  const handleChangeBody = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues(current => ({ ...current, body: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setErrors({
      name: !name,
      email: !email,
      body: !body,
    });

    if (!name || !email || !body) {
      return;
    }

    setSubmitting(true);

    await onAddComment({ name, email, body });

    setSubmitting(false);
    setValues(current => ({ ...current, body: '' }));
  };

  const clearForm = () => {
    setValues({
      name: '',
      email: '',
      body: '',
    });

    setErrors({
      name: false,
      email: false,
      body: false,
    });
  };

  return (
    <>
      <form
        data-cy="NewCommentForm"
        onSubmit={handleSubmit}
        onReset={clearForm}
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
              className={classNames('input', { 'is-danger': errors.name })}
              value={name}
              onChange={handleChangeName}
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
              value={email}
              onChange={handleChangeEmail}
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
              value={body}
              onChange={handleChangeBody}
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
              className={classNames('button', 'is-link', {
                'is-loading': submitting,
              })}
            >
              Add
            </button>
          </div>

          <div className="control">
            {/* eslint-disable-next-line react/button-has-type */}
            <button type="reset" className="button is-link is-light">
              Clear
            </button>
          </div>
        </div>
      </form>
      {error.isError && (
        <div className="notification is-danger is-light has-text-weight-normal">
          Unable to add a comment
        </div>
      )}
    </>
  );
};
