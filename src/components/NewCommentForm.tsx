import classNames from 'classnames';
import React, { useState } from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  onSubmit: (newComment: Omit<Comment, 'id'>) => Promise<void>;
  postId: Post['id'];
};

export const NewCommentForm: React.FC<Props> = ({ onSubmit, postId }) => {
  const [name, setName] = useState('');
  const [hasAuthorError, setHasAuthorError] = useState(false);

  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);

  const [body, setBody] = useState('');
  const [hasTextError, setHasTextError] = useState(false);

  const [loadingAdd, setLoadingAdd] = useState<boolean>(false);

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setHasAuthorError(false);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setHasEmailError(false);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
    setHasTextError(false);
  };

  const clear = () => {
    setHasAuthorError(false);
    setHasEmailError(false);
    setBody('');
    setHasTextError(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setHasAuthorError(!name);
    setHasEmailError(!email);
    setHasTextError(!body);

    if (!name || !email || !body) {
      return;
    }

    const newComment = {
      postId,
      name,
      email,
      body,
    };

    setLoadingAdd(true);
    try {
      await onSubmit(newComment);
      clear();
    } finally {
      setLoadingAdd(false);
    }
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
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': hasAuthorError })}
            value={name}
            onChange={handleAuthorChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasAuthorError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasAuthorError && (
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
            onChange={handleEmailChange}
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
            className={classNames('textarea', { 'is-danger': hasTextError })}
            value={body}
            onChange={handleTextChange}
          />
        </div>
        {hasTextError && (
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
              'is-loading': loadingAdd,
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
