import React, { useState } from 'react';
import { addComment } from '../api/post';
import classNames from 'classnames';
import { Comment } from '../types/Comment';

type Props = {
  selectedPostId: number;
  onAdd: (comment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({ selectedPostId, onAdd }) => {
  const [name, setName] = useState('');
  const [hasNameError, setHasNameError] = useState(false);

  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);

  const [body, setBody] = useState('');
  const [hasBodyError, setHasBodyError] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setHasNameError(false);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setHasEmailError(false);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
    setHasBodyError(false);
  };

  const reset = () => {
    setBody('');

    setHasNameError(false);
    setHasEmailError(false);
    setHasBodyError(false);
  };

  const clear = () => {
    setName('');
    setEmail('');
    setBody('');

    setHasNameError(false);
    setHasEmailError(false);
    setHasBodyError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const isNameInvalid = !name.trim();
    const isEmailInvalid = !email.trim();
    const isBodyInvalid = !body.trim();

    setHasNameError(isNameInvalid);
    setHasEmailError(isEmailInvalid);
    setHasBodyError(isBodyInvalid);

    if (isNameInvalid || isEmailInvalid || isBodyInvalid) {
      setIsSubmitting(false);

      return;
    }

    const newComment = {
      name,
      email,
      body,
    };

    setIsSubmitting(true);

    addComment(selectedPostId, newComment)
      .then(comment => {
        onAdd(comment);
        reset();
      })
      .finally(() => {
        setIsSubmitting(false);
      });
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
            value={name}
            onChange={handleNameChange}
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': hasNameError })}
            disabled={isSubmitting}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasNameError && (
            <>
              <span
                className={classNames('icon is-small is-right', {
                  'has-text-danger': hasNameError,
                })}
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>

              <p className="help is-danger" data-cy="ErrorMessage">
                Name is required
              </p>
            </>
          )}
        </div>
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleEmailChange}
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': hasEmailError })}
            disabled={isSubmitting}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasEmailError && (
            <>
              <span
                className={classNames('icon is-small is-right', {
                  'has-text-danger': hasEmailError,
                })}
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>

              <p className="help is-danger" data-cy="ErrorMessage">
                Email is required
              </p>
            </>
          )}
        </div>
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
            onChange={handleBodyChange}
            placeholder="Type comment here"
            className={classNames('textarea', { 'is-danger': hasBodyError })}
            disabled={isSubmitting}
          />
        </div>

        {hasBodyError && (
          <p
            className={classNames('help', { 'is-danger': hasBodyError })}
            data-cy="ErrorMessage"
          >
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': isSubmitting,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={clear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
