/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { addPostComment } from '../utils/Post';

type Props = {
  postId: number;
  setComments: (comments: any) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, setComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const [isErrorName, setIsErrorName] = useState(false);
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorBody, setIsErrorBody] = useState(false);

  useEffect(() => {
    if (name || email || body) {
      setIsErrorName(false);
      setIsErrorEmail(false);
      setIsErrorBody(false);
    }
  }, [name, email, body]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const comment = {
      name: name.trim().split(/\s+/).join(' '),
      email: email.trim().split(/\s+/).join(' '),
      body: body.trim().split(/\s+/).join(' '),
      postId,
    };

    if (!name.trim() || !email.trim() || !body.trim()) {
      setIsErrorName(!name.trim());
      setIsErrorEmail(!email.trim());
      setIsErrorBody(!body.trim());

      setTimeout(() => {
        setLoading(false);
      }, 400);

      return;
    }

    addPostComment(comment)
      .then(() => {
        setName('');
        setEmail('');
        setBody('');
      })
      .then(() => {
        setComments((comments: any[]) => [...comments, comment]);
      })
      .catch(() => {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 2000);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setBody('');
    setIsErrorName(false);
    setIsErrorEmail(false);
    setIsErrorBody(false);
  };

  return (
    <>
      {showError && (
        <div className="notification is-danger" data-cy="AddCommentError">
          Something went wrong!
        </div>
      )}

      <form data-cy="NewCommentForm" onSubmit={handleFormSubmit}>
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
              className={cn('input', { 'is-danger': isErrorName })}
              value={name}
              onChange={event => setName(event.target.value)}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>

            {isErrorName && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>

          {isErrorName && (
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
              className={cn('input', { 'is-danger': isErrorEmail })}
              value={email}
              onChange={event => setEmail(event.target.value)}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>

            {isErrorEmail && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>

          {isErrorEmail && (
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
              className={cn('textarea', { 'is-danger': isErrorBody })}
              value={body}
              onChange={event => setBody(event.target.value)}
            />
          </div>

          {isErrorBody && (
            <p className="help is-danger" data-cy="ErrorMessage">
              Enter some text
            </p>
          )}
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              type="submit"
              className={cn('button is-link', { 'is-loading': loading })}
            >
              Add
            </button>
          </div>

          <div className="control">
            {/* eslint-disable-next-line react/button-has-type */}
            <button
              type="reset"
              className="button is-link is-light"
              onClick={clearForm}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
