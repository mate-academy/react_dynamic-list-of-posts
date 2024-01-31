import React, { useState } from 'react';
import classNames from 'classnames';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  selectedPost: Post;
  addComment: (comment: Comment) => Promise<void>
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPost,
  addComment,
}) => {
  const [name, setName] = useState('');
  const [hasNameError, setHasNameError] = useState(false);

  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);

  const [body, setBody] = useState('');
  const [hasBodyError, setHasBodyError] = useState(false);

  const [isSubmited, setIsSubmited] = useState(false);
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setBody('');

    setHasNameError(false);
    setHasEmailError(false);
    setHasBodyError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasNameError(!name);
    setHasEmailError(!email);
    setHasBodyError(!body);

    setIsSubmited(true);

    if (!name || !email || !body) {
      return;
    }

    setLoading(true);

    const id = selectedPost?.id || 0;

    addComment({
      id,
      postId: selectedPost.id,
      name,
      email,
      body,
    })
      .then(() => reset())
      .finally(() => {
        setLoading(false);
        setIsSubmited(false);
      });
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    reset();
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;

    setName(newName);

    if (newName) {
      setHasNameError(false);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;

    setEmail(newEmail);

    if (newEmail) {
      setHasEmailError(false);
    }
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newBody = event.target.value;

    setBody(newBody);

    if (newBody) {
      setHasBodyError(false);
    }
  };

  const showNameError = isSubmited && hasNameError;
  const showEmailError = isSubmited && hasEmailError;
  const showBodyError = isSubmited && hasBodyError;

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={handleClear}
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
            className={classNames('input', {
              'is-danger': showNameError,
            })}
            value={name}
            onChange={handleTitleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {showNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}

        </div>

        {showNameError && (
          <p
            className={classNames('help', {
              'is - danger': showNameError,
            })}
            data-cy="ErrorMessage"
          >
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
            className={classNames('input', {
              'is-danger': showEmailError,
            })}
            value={email}
            onChange={handleEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {showEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {showEmailError && (
          <p
            className={classNames('help', {
              'is-danger': showEmailError,
            })}
            data-cy="ErrorMessage"
          >
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
            className={classNames('textarea', {
              'is-danger': showBodyError,
            })}
            value={body}
            onChange={handleBodyChange}
          />
        </div>

        {showBodyError && (
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
              'is-loading': loading,
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
