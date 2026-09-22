import React, { useState } from 'react';
import classNames from 'classnames';

type Props = {
  onSubmit: (comment: {
    name: string;
    email: string;
    body: string;
  }) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const [hasNameError, setHasNameError] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasBodyError, setHasBodyError] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReset = () => {
    setName('');
    setEmail('');
    setBody('');
    setHasNameError(false);
    setHasEmailError(false);
    setHasBodyError(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const isNameValid = name.trim().length > 0;
    const isEmailValid = email.trim().length > 0;
    const isBodyValid = body.trim().length > 0;

    setHasNameError(!isNameValid);
    setHasEmailError(!isEmailValid);
    setHasBodyError(!isBodyValid);

    if (!isNameValid || !isEmailValid || !isBodyValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        name: name.trim(),
        email: email.trim(),
        body: body.trim(),
      });
      setBody('');
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={handleReset}
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
            onChange={event => {
              setName(event.target.value);
              if (hasNameError) {
                setHasNameError(false);
              }
            }}
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
            className={classNames('input', { 'is-danger': hasEmailError })}
            value={email}
            onChange={event => {
              setEmail(event.target.value);
              if (hasEmailError) {
                setHasEmailError(false);
              }
            }}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {hasEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {hasEmailError && (
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
            className={classNames('textarea', { 'is-danger': hasBodyError })}
            value={body}
            onChange={event => {
              setBody(event.target.value);
              if (hasBodyError) {
                setHasBodyError(false);
              }
            }}
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
              'is-loading': isSubmitting,
            })}
            disabled={isSubmitting}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            disabled={isSubmitting}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
