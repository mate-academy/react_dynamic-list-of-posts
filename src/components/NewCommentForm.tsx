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
  const [noName, setNoName] = useState(false);
  const [noEmail, setNoEmail] = useState(false);
  const [noBody, setNoBody] = useState(false);
  const [hasSubmittingError, setHasSubmittingError] = useState(false);

  const resetErrors = () => {
    setNoName(false);
    setNoEmail(false);
    setNoBody(false);
  };

  const clearInputs = () => {
    setName('');
    setEmail('');
    setBody('');
    resetErrors();
  };

  const handleNewCommentSubmit = () => {
    setHasSubmittingError(false);

    if (!name.trim()) {
      setNoName(true);
    }

    if (!email.trim()) {
      setNoEmail(true);
    }

    if (!body.trim()) {
      setNoBody(true);
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
        onSubmit={e => e.preventDefault()}
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
                { 'is-danger': noName && !name.length },
              )}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>

            {noName && !name.length && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>

          {noName && !name.length && (
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
                { 'is-danger': noEmail && !email.length },
              )}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>

            {noEmail && !email.length && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>

          {noEmail && !email.length && (
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
                { 'is-danger': noBody && !body.length },
              )}
            />
          </div>

          {noBody && !body.length && (
            <p className="help is-danger" data-cy="ErrorMessage">
              Enter some text
            </p>
          )}
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              type="submit"
              onClick={handleNewCommentSubmit}
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
