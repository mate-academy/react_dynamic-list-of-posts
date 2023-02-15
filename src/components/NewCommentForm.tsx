import cn from 'classnames';
import React, { useState } from 'react';
import { CommentData } from '../types/Comment';

type Props = {
  onSubmit: (data: CommentData) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({ onSubmit }) => {
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [touchedName, setTouchedName] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedBody, setTouchedBody] = useState(false);

  const isValid = Boolean(name && email && body);

  const clearForm = () => {
    setName('');
    setEmail('');
    setBody('');
    setTouchedName(false);
    setTouchedEmail(false);
    setTouchedBody(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    setSubmitting(true);

    await onSubmit({ name, email, body });
    setSubmitting(false);

    setBody('');
    setTouchedName(false);
    setTouchedEmail(false);
    setTouchedBody(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={clearForm}
      data-cy="NewCommentForm"
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', {
              'is-danger': touchedName,
            })}
            value={name}
            onChange={event => setName(event.target.value)}
            onBlur={() => setTouchedName(true)}
          />
          {
            touchedName && (
              <>
                <span className="icon is-small is-left">
                  <i className="fas fa-user" />
                </span>
                {!name && (
                  <span
                    className="icon is-small is-right has-text-danger"
                    data-cy="ErrorIcon"
                  >
                    <i className="fas fa-exclamation-triangle" />
                  </span>
                )}

                {!name && (
                  <p className="help is-danger" data-cy="ErrorMessage">
                    Name is required
                  </p>
                )}
              </>
            )
          }
        </div>
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', { 'is-danger': touchedEmail })}
            value={email}
            onChange={event => setEmail(event.target.value)}
            onBlur={() => setTouchedEmail(true)}
          />

          {
            touchedEmail && (
              <>
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope" />
                </span>
                {!email && (
                  <span
                    className="icon is-small is-right has-text-danger"
                    data-cy="ErrorIcon"
                  >
                    <i className="fas fa-exclamation-triangle" />
                  </span>
                )}
                {!email && (
                  <p className="help is-danger" data-cy="ErrorMessage">
                    Email is required
                  </p>
                )}
              </>
            )
          }
        </div>
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            placeholder="Type comment here"
            className={cn('textarea', { 'is-danger': touchedBody })}
            value={body}
            onChange={event => setBody(event.target.value)}
            onBlur={() => setTouchedBody(true)}
          />
        </div>

        {
          touchedBody && (
            <>
              {!body && (
                <p className="help is-danger" data-cy="BodyField">
                  Enter some text
                </p>
              )}
            </>
          )
        }
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button', 'is-link', {
              'is-loading': submitting,
            })}
            // disabled={!isValid}
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
  );
};
