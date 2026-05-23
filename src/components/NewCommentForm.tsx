import classNames from 'classnames';
import React, { useState } from 'react';
import { postComments } from '../api/comment';
import { Comment, NewCommentData } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  post?: Post;
  setErrorMessage: (error: string) => void;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export const NewCommentForm: React.FC<Props> = ({
  post,
  setComments,
  setErrorMessage,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isCommentAdding, setIsCommentAdding] = useState(false);
  const [hasNameError, setHasNameError] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasBodyError, setHasBodyError] = useState(false);

  function clearInputErrors() {
    setHasNameError(false);
    setHasEmailError(false);
    setHasBodyError(false);
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasNameError(false);
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasEmailError(false);
    setEmail(event.target.value);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHasBodyError(false);
    setBody(event.target.value);
  };

  const handleReset = () => {
    setEmail('');
    setName('');
    setBody('');
    clearInputErrors();
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanBody = body.trim();
    const isNameValid = !!cleanName;
    const isEmailValid = !!cleanEmail;
    const isBodyValid = !!cleanBody;

    setHasNameError(!isNameValid);
    setHasEmailError(!isEmailValid);
    setHasBodyError(!isBodyValid);

    if (!isNameValid || !isEmailValid || !isBodyValid || !post) {
      return;
    }

    const newComment: NewCommentData = {
      postId: post.id,
      name: cleanName,
      body: cleanBody,
      email: cleanEmail,
    };

    setIsCommentAdding(true);

    postComments(newComment)
      .then(createdComment => {
        setComments(currentComments => [...currentComments, createdComment]);
        setBody('');
        clearInputErrors();
      })
      .catch(() => setErrorMessage('cant add a comment'))
      .finally(() => setIsCommentAdding(false));
  };

  return (
    <form
      data-cy="NewCommentForm"
      onReset={handleReset}
      onSubmit={handleSubmit}
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
            className={classNames('input', {
              'is-danger': hasNameError,
            })}
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
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"
            value={email}
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': hasEmailError,
            })}
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
            value={body}
            name="body"
            placeholder="Type comment here"
            className={classNames('textarea', {
              'is-danger': hasBodyError,
            })}
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
              'is-loading': isCommentAdding,
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
