import classNames from 'classnames';
import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  onSubmit: (comment: Comment) => void;
  selectedPost: Post;
  loadingComments: boolean;
};

export const NewCommentForm: React.FC<Props> = ({
  onSubmit,
  selectedPost,
  loadingComments,
}) => {
  const [name, setName] = useState('');
  const [hasNameError, setHasNameError] = useState(false);

  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);

  const [body, setBody] = useState('');
  const [hasBodyError, setHasBodyError] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setHasNameError(false);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setHasEmailError(false);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setBody(event.target.value);
    setHasBodyError(false);
  };

  const handleReset = () => {
    setBody('');

    setHasNameError(false);
    setHasEmailError(false);
    setHasBodyError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedBody = body.trim();

    setHasNameError(!trimmedName);
    setHasEmailError(!email);
    setHasBodyError(!trimmedBody);

    if (!trimmedName || !email || !trimmedBody) {
      return;
    }

    onSubmit({
      id: 0,
      postId: +selectedPost.id,
      name: trimmedName,
      email: email,
      body: trimmedBody,
    });

    handleReset();
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="body-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="body-author-name"
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
        <label className="label" htmlFor="body-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="email"
            name="email"
            id="body-author-email"
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
        <label className="label" htmlFor="body-body">
          body Text
        </label>

        <div className="control">
          <textarea
            id="body-body"
            name="body"
            placeholder="Type body here"
            className={classNames('textarea', {
              'is-danger': hasBodyError,
            })}
            value={body}
            onChange={handleCommentChange}
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
              'is-loading': loadingComments,
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
