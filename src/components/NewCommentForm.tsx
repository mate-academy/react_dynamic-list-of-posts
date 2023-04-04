import React, { Dispatch, SetStateAction, useState } from 'react';
import classNames from 'classnames';
import { Comment } from '../types/Comment';
import { addComment } from '../api/api';

type Props = {
  postId: number;
  setComments: Dispatch<SetStateAction<Comment[]>>;
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  setComments,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasName, setHasName] = useState(false);
  const [hasEmail, setHasEmail] = useState(false);
  const [hasBody, setHasBody] = useState(false);
  const [hasSubmittingError, setHasSubmittingError] = useState(false);

  const resetErrors = () => {
    setHasName(false);
    setHasEmail(false);
    setHasBody(false);
  };

  const clearInputs = () => {
    setName('');
    setEmail('');
    setBody('');
    resetErrors();
  };

  const handleNewCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSubmittingError(false);

    if (!name.trim()) {
      setHasName(true);
    }

    if (!email.trim()) {
      setHasEmail(true);
    }

    if (!body.trim()) {
      setHasBody(true);
    }

    if (!name.trim() || !email.trim() || !body.trim()) {
      setIsSubmitting(false);

      return;
    }

    setIsSubmitting(true);

    addComment({
      postId,
      name,
      email,
      body,
    })
      .then(result => setComments(prev => [...prev, result]))
      .catch(() => setHasSubmittingError(true))
      .finally(() => {
        setIsSubmitting(false);
        resetErrors();
        setBody('');
      });
  };

  return (
    <>
      <form
        data-cy="NewCommentForm"
        className="form"
        onSubmit={handleNewCommentSubmit}
      >
        <div className="field" data-cy="NameField">
          <label className="label" htmlFor="comment-author-name">
            Author Name
          </label>

          <div className="control has-icons-left has-icons-right">
            <input
              value={name}
              type="text"
              name="name"
              id="comment-author-name"
              placeholder="Name Surname"
              onChange={e => setName(e.target.value)}
              className={classNames(
                'input',
                { 'is-danger': hasName && !name.length },
              )}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>

            {hasName && !name.length && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>

          {hasName && !name.length && (
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
              value={email}
              type="text"
              name="email"
              id="comment-author-email"
              placeholder="email@test.com"
              onChange={e => setEmail(e.target.value)}
              className={classNames(
                'input',
                { 'is-danger': hasEmail && !email.length },
              )}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>

            {hasEmail && !email.length && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>

          {hasEmail && !email.length && (
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
              value={body}
              id="comment-body"
              name="body"
              placeholder="Type comment here"
              onChange={e => setBody(e.target.value)}
              className={classNames(
                'textarea',
                { 'is-danger': hasBody && !body.length },
              )}
            />
          </div>

          {hasBody && !body.length && (
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
                { 'is-loading': isSubmitting },
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
              onClick={clearInputs}
            >
              Clear
            </button>
          </div>
        </div>
      </form>

      {hasSubmittingError && (
        <div className="notification is-danger" data-cy="CommentsError">
          Can`t add a comment
        </div>
      )}
    </>
  );
};
