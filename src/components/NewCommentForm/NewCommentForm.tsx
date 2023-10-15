import React, { useState } from 'react';
import classNames from 'classnames';

import { addComment } from '../../api/posts';
import { usePosts } from '../../PostsContext';
import { Errors } from '../../types/Errors';

export const NewCommentForm: React.FC = () => {
  const {
    selectedPost,
    errorMessage,
    setErrorMessage,
    setComments,
    removeError,
  } = usePosts();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const [hasNameEmpty, setHasNameEmpty] = useState<boolean>(false);
  const [hasEmailEmpty, setHasEmailEmpty] = useState<boolean>(false);
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [hasBodyEmpty, setHasBodyEmpty] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleReset = () => {
    setName('');
    setEmail('');
    setBody('');

    setHasNameEmpty(false);
    setHasEmailEmpty(false);
    setHasBodyEmpty(false);
    setInvalidEmail(false);
  };

  const handleNameChange = ((event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setHasNameEmpty(false);
  });

  const handleEmailChange = ((event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setHasEmailEmpty(false);
    setInvalidEmail(false);
  });

  const handleBodyChange = ((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
    setHasBodyEmpty(false);
  });

  const validEmail
    = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedBody = body.trim();

    setHasNameEmpty(!trimmedName);
    setHasEmailEmpty(!trimmedEmail);
    setHasBodyEmpty(!trimmedBody);

    if (!trimmedEmail.match(validEmail)) {
      setInvalidEmail(true);

      return;
    }

    if (selectedPost) {
      const createdComment = {
        name: trimmedName,
        email: trimmedEmail,
        body: trimmedBody,
        postId: selectedPost.id,
      };

      setIsLoading(true);

      addComment(createdComment)
        .then(response => {
          setComments((currentComments) => [...currentComments, response]);

          setBody('');
        })
        .catch(() => {
          setErrorMessage(Errors.addingComment);
          removeError();
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleFormSubmit}
    >
      <div
        className="field"
        data-cy="NameField"
      >
        <label
          className="label"
          htmlFor="comment-author-name"
        >
          Author Name
        </label>

        <div
          className={classNames('control has-icons-left', {
            'has-icons-right': hasNameEmpty,
          })}
        >
          <input
            type="text"
            name="name"
            value={name}
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': hasNameEmpty,
            })}
            onChange={handleNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasNameEmpty && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasNameEmpty && (
          <p
            className="help is-danger"
            data-cy="ErrorMessage"
          >
            Name is required
          </p>
        )}
      </div>

      <div
        className="field"
        data-cy="EmailField"
      >
        <label
          className="label"
          htmlFor="comment-author-email"
        >
          Author Email
        </label>

        <div
          className={classNames('control has-icons-left', {
            'has-icons-right': hasEmailEmpty || invalidEmail,
          })}
        >
          <input
            type="text"
            name="email"
            value={email}
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': hasEmailEmpty || invalidEmail,
            })}
            onChange={handleEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {(hasEmailEmpty || invalidEmail) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasEmailEmpty && (
          <p
            className="help is-danger"
            data-cy="ErrorMessage"
          >
            Email is required
          </p>
        )}

        {invalidEmail && !hasEmailEmpty && (
          <p
            className="help is-danger"
            data-cy="ErrorMessage"
          >
            Please enter valid email
          </p>
        )}
      </div>

      <div
        className="field"
        data-cy="BodyField"
      >
        <label
          className="label"
          htmlFor="comment-body"
        >
          Comment Text
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            value={body}
            placeholder="Type comment here"
            className={classNames('textarea', {
              'is-danger': hasBodyEmpty,
            })}
            onChange={handleBodyChange}
          />
        </div>

        {hasBodyEmpty && (
          <p
            className="help is-danger"
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
              'is-loading': isLoading,
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
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>

      {errorMessage === Errors.addingComment && (
        <div
          className="notification is-danger"
          data-cy="PostsLoadingError"
        >
          {Errors.addingComment}
        </div>
      )}
    </form>
  );
};
