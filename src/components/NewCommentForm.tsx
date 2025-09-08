import classNames from 'classnames';
import React, { SetStateAction, useState } from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import * as commentsService from '../services/comments';

type Props = {
  post: Post;
  setComments: React.Dispatch<SetStateAction<Comment[]>>;
  setErrorMessageComments: (errorMessageComments: boolean) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  setComments,
  post,
  setErrorMessageComments,
}) => {
  const [commentLoading, setCommentLoading] = useState(false);

  const [name, setName] = useState('');
  const [hasNameError, setHasNameError] = useState(false);

  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);

  const [body, setBody] = useState('');
  const [hasBodyError, setHasBodyError] = useState(false);

  const hiddenError = () => {
    setErrorMessageComments(true);
    setTimeout(() => setErrorMessageComments(false), 3000);
  };

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

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedBody = body.trim();

    setHasNameError(!trimmedName);
    setHasEmailError(!trimmedEmail);
    setHasBodyError(!trimmedBody);

    if (!trimmedName || !trimmedEmail || !trimmedBody) {
      return;
    }

    const commentToAdd = {
      postId: post.id,
      name: trimmedName,
      email: trimmedEmail,
      body: trimmedBody,
    };

    setCommentLoading(true);

    commentsService
      .createComment(commentToAdd)
      .then(newComment => {
        setComments(current => [...current, newComment]);
        setBody('');
      })
      .catch(() => hiddenError())
      .finally(() => setCommentLoading(false));
  };

  const onReset = () => {
    setName('');
    setEmail('');
    setBody('');

    setHasNameError(false);
    setHasBodyError(false);
    setHasEmailError(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={onSubmit} onReset={onReset}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div
          className={classNames('control has-icons-left', {
            'has-icons-right': hasNameError,
          })}
        >
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': hasNameError,
            })}
            value={name}
            onChange={handleNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasNameError && (
            <>
              <span
                className="icon is-small is-right has-text-danger"
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
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': hasEmailError,
            })}
            value={email}
            onChange={handleEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasEmailError && (
            <>
              <span
                className="icon is-small is-right has-text-danger"
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
            placeholder="Type comment here"
            className={classNames('textarea', {
              'is-danger': hasBodyError,
            })}
            value={body}
            onChange={handleBodyChange}
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
              'is-loading': commentLoading,
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
  );
};
