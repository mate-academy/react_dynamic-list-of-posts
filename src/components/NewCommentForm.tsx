import classNames from 'classnames';
import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  post: Post | null;
  onSubmitComments: (comment: Comment) => void;
  submitLoading: boolean;
  addCommentError: boolean;
  lastCommentPayload: Omit<Comment, 'id'> | null;
};

export const NewCommentForm: React.FC<Props> = ({
  post,
  onSubmitComments,
  submitLoading,
  addCommentError,
  lastCommentPayload,
}) => {
  const [name, setName] = useState('');
  const [hasNameError, setHasNameError] = useState(false);

  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);

  const [body, setBody] = useState('');
  const [hasBodyError, setHasBodyError] = useState(false);

  const reset = () => {
    setName('');
    setEmail('');
    setBody('');

    setHasNameError(false);
    setHasEmailError(false);
    setHasBodyError(false);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={event => {
        event.preventDefault();

        const nameT = name.trim();
        const emailT = email.trim();
        const bodyT = body.trim();

        setHasNameError(!nameT);
        setHasEmailError(!emailT);
        setHasBodyError(!bodyT);

        if (!nameT || !emailT || !bodyT) {
          return;
        }

        if (post) {
          onSubmitComments({
            name: nameT,
            email: emailT,
            body: bodyT,
            id: 0,
            postId: post.id,
          });
        }

        if (!addCommentError) {
          setBody('');
        }

        setHasNameError(false);
        setHasEmailError(false);
        setHasBodyError(false);
      }}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            value={name}
            onChange={event => {
              setHasNameError(false);
              setName(event.target.value);
            }}
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': hasNameError,
            })}
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
            value={email}
            onChange={event => {
              setHasEmailError(false);
              setEmail(event.target.value);
            }}
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': hasEmailError,
            })}
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
            value={body}
            onChange={event => {
              setHasBodyError(false);
              setBody(event.target.value);
            }}
            name="body"
            placeholder="Type comment here"
            className={classNames('textarea', {
              'is-danger': hasBodyError,
            })}
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
            className={classNames('button is-link', {
              'is-loading': submitLoading,
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
            onClick={reset}
          >
            Clear
          </button>
        </div>
        {addCommentError && lastCommentPayload && (
          <div className="control">
            {/* eslint-disable-next-line react/button-has-type */}
            <button type="button" className="button is-link is-light">
              Retry
            </button>
          </div>
        )}
      </div>
    </form>
  );
};
