import React, { useState } from 'react';
import classNames from 'classnames';
import { addComment } from '../api/posts';

interface Props {
  postId: number | undefined,
  getPostInfo: () => void,
  setError: React.Dispatch<React.SetStateAction<string>>
}

export const NewCommentForm: React.FC<Props> = ({
  postId, getPostInfo, setError,
}) => {
  const [body, setBody] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [showRequiredOn, setShowRequiredOn] = useState('');

  const addCommentRequest = () => {
    if (postId) {
      if (body && email && name) {
        setShowRequiredOn('');

        addComment({
          postId, name, email, body,
        })
          .then(() => {
            getPostInfo();
            setBody('');
            setError('');
          })
          .catch(() => {
            setError(
              'Cannot add comment. '
              + 'Check your internet connection and try again.',
            );
          });

        return;
      }

      if (!name) {
        setShowRequiredOn('name');

        return;
      }

      if (!email) {
        setShowRequiredOn('email');

        return;
      }

      if (!body) {
        setShowRequiredOn('body');
      }
    }
  };

  const handleReset = () => {
    setBody('');
    setEmail('');
    setName('');
  };

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    addCommentRequest();
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
            value={name}
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames(
              'input',
              {
                'is-danger': showRequiredOn === 'name',
              },
            )}
            onChange={(ev) => setName(ev.currentTarget.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {showRequiredOn === 'name' ? (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          ) : null}
        </div>

        {showRequiredOn === 'name' ? (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        ) : null}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="email"
            name="email"
            value={email}
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames(
              'input',
              {
                'is-danger': showRequiredOn === 'email',
              },
            )}
            onChange={(ev) => setEmail(ev.currentTarget.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {showRequiredOn === 'email' ? (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          ) : null}
        </div>

        {showRequiredOn === 'email' ? (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        ) : null}
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
            placeholder="Type comment here"
            className={classNames(
              'textarea',
              {
                'is-danger': showRequiredOn === 'body',
              },
            )}
            onChange={(ev) => setBody(ev.currentTarget.value)}
          />
        </div>

        {showRequiredOn === 'body' ? (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        ) : null}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className="button is-link"
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
