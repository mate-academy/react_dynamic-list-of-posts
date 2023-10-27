import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { CommentData } from '../types/Comment';
import {
  CommentsContext,
  ErrorContext,
} from './UserContext/UserContext';
import { createComment } from '../api/comments';

type PostId = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

type NewCommentFormProps = {
  postId: PostId,
};

export const NewCommentForm: React.FC<NewCommentFormProps> = ({ postId }) => {
  const [submitting, setSubmitting] = useState(false);
  const { newCommentSelect } = useContext(CommentsContext);

  const { isError } = useContext(ErrorContext);

  const onAddComment = async ({ name, email, body }: CommentData) => {
    const newComment = {
      name,
      email,
      body,
      postId: postId.id,
    };

    try {
      setSubmitting(true);
      await createComment(newComment);
    } catch (error) {
      setSubmitting(false);
    } finally {
      setSubmitting(false);
    }
  };

  const [hasNameError, setHasNameError] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);
  const [emailValidationError, setEmailValidationError] = useState(false);
  const [hasBodyError, setHasBodyError] = useState(false);

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

  const validateEmail = (em: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    return emailRegex.test(em);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setEmailValidationError(true);
    }

    if (!email.trim().length) {
      setHasEmailError(true);
    }

    if (!name.trim().length) {
      setHasNameError(true);
    }

    if (!body.length) {
      setHasBodyError(true);
    }

    if (!validateEmail(email) || !email.trim().length
      || !name.trim().length || !body.length) {
      return;
    }

    await onAddComment({ name, email, body });

    const newComment = {
      name,
      email,
      body,
      postId: postId.id,
      id: Date.now(),
    };

    newCommentSelect(newComment);

    setValues(current => ({ ...current, body: '' }));
  };

  const clearForm = () => {
    setValues({
      name: '',
      email: '',
      body: '',
    });

    setHasNameError(false);
    setHasEmailError(false);
    setEmailValidationError(false);
    setHasBodyError(false);
  };

  const focusErrorDisabled = () => {
    setEmailValidationError(false);
    setHasEmailError(false);
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
              className={classNames('input', { 'is-danger': hasNameError })}
              value={name}
              onChange={handleChangeName}
              onFocus={() => setHasNameError(false)}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>

            {hasNameError && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}

          </div>

          {hasNameError && (
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
              className={classNames('input',
                { 'is-danger': hasEmailError })}
              value={email}
              onChange={handleChangeEmail}
              onFocus={() => focusErrorDisabled()}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>

            {(hasEmailError || emailValidationError) && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}

          </div>
          {(hasEmailError) && (
            <p className="help is-danger" data-cy="ErrorMessage">
              Email is required
            </p>
          )}
          {emailValidationError && (
            <p className="help is-danger" data-cy="ErrorMessage">
              Invalid email address
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
              className={classNames('textarea',
                { 'is-danger': hasBodyError })}
              value={body}
              onChange={handleChangeBody}
              onFocus={() => setHasBodyError(false)}
            />
          </div>

          {hasBodyError && (
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
      {isError && (
        <div className="notification is-danger is-light has-text-weight-normal">
          Unable to add a comment
        </div>
      )}
    </>
  );
};
