import React, { useState } from 'react';
import cn from 'classnames';
import { createComment } from '../api/postService';
import { usePosts } from '../hooks/usePosts';

export const NewCommentForm: React.FC = () => {
  const {
    setPostComments,
    selectedPost,
    setHasFormError,
  } = usePosts();

  const [hasNameError, setHasNameError] = useState(false);
  const [name, setName] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);
  const [email, setEmail] = useState('');
  const [hasCommentError, setHasCommentError] = useState(false);
  const [comment, setComment] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasNameError(false);
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasEmailError(false);
    setEmail(event.target.value);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setHasCommentError(false);
    setComment(event.target.value);
  };

  const reset = () => {
    setComment('');
    setEmail('');
    setName('');
    setHasNameError(false);
    setHasEmailError(false);
    setHasCommentError(false);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name) {
      setHasNameError(true);
    }

    if (!email) {
      setHasEmailError(true);
    }

    if (!comment) {
      setHasCommentError(true);
    }

    if (!name || !email || !comment) {
      return;
    }

    setIsLoading(true);

    createComment({
      postId: selectedPost?.id || 0,
      name,
      email,
      body: comment,
    }).then(commentFromServer => {
      setPostComments(prevComments => {
        if (prevComments) {
          return [...prevComments, commentFromServer];
        }

        return null;
      });
    }).catch(() => {
      setHasFormError(true);
    }).finally(() => {
      setIsLoading(false);
      setComment('');
    });
  };

  return (
    <form
      data-cy="NewCommentForm"
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
            value={name}
            onChange={handleNameChange}
            className={cn(
              'input',
              {
                'is-danger': hasNameError,
              },
            )}
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
            id="comment-author-email"
            placeholder="email@test.com"
            value={email}
            onChange={handleEmailChange}
            className={cn(
              'input',
              {
                'is-danger': hasEmailError,
              },
            )}
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
            value={comment}
            onChange={handleCommentChange}
            className={cn(
              'textarea',
              {
                'is-danger': hasCommentError,
              },
            )}
          />
        </div>

        {hasCommentError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn(
              'button',
              'is-link',
              {
                'is-loading': isLoading,
              },
            )}
            onClick={onSubmit}
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
