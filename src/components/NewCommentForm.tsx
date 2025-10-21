import React, { useState } from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';
import { NewComment } from '../types/Comment';
import PropTypes from 'prop-types';

type Props = {
  selectedPost: Post;
  onSubmit: (data: NewComment) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({ selectedPost, onSubmit }) => {
  //#region State
  const [name, setName] = useState<string>('');
  const [hasNameError, setHasNameError] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [hasEmailError, setHasEmailError] = useState<boolean>(false);

  const [body, setBody] = useState<string>('');
  const [hasBodyError, setHasBodyError] = useState<boolean>(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  //#endregion

  //#region handlers and reset
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

  const reset = () => {
    setBody('');
    setEmail('');
    setName('');
    setHasNameError(false);
    setHasEmailError(false);
    setHasBodyError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const commentName = name.trim();
    const commentEmail = email.trim();
    const commentBody = body.trim();

    setHasNameError(!commentName);
    setHasEmailError(!commentEmail);
    setHasBodyError(!commentBody);

    if (!commentName || !commentEmail || !commentBody) {
      return;
    }

    setIsSubmitting(true);

    onSubmit({
      name: commentName,
      email: commentEmail,
      body: commentBody,
      postId: selectedPost.id,
    })
      .then(() => {
        setBody('');
        setHasNameError(false);
        setHasEmailError(false);
        setHasBodyError(false);
      })
      .finally(() => setIsSubmitting(false));
  };
  //#endregion

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div
          className={cn('control', 'has-icons-left', {
            'has-icons-right': hasNameError,
          })}
        >
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', { 'is-danger': hasNameError })}
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
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div
          className={cn('control', 'has-icons-left', {
            'has-icons-right': hasEmailError,
          })}
        >
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', { 'is-danger': hasEmailError })}
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
            className={cn('textarea', { 'is-danger': hasBodyError })}
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
            className={cn('button', 'is-link', {
              'is-loading': isSubmitting,
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
      </div>
    </form>
  );
};

const PostShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
});

NewCommentForm.propTypes = {
  // selectedPost обов'язковий об'єкт Post
  selectedPost: PostShape.isRequired as unknown as PropTypes.Validator<Post>,
  // функція onSubmit обов'язкова
  onSubmit: PropTypes.func.isRequired,
};
