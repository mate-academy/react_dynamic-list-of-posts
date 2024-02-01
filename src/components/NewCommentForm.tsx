import React, { useState } from 'react';
import cn from 'classnames';
import { Errors } from '../types/Errors';
import { usePosts } from '../context/PostContext';
import { Comment, CommentData } from '../types/Comment';
import { createComment } from '../api/comments';

export const NewCommentForm: React.FC = () => {
  const {
    selectedPostId,
    setErrorMessage,
    postComments,
    setPostComments,
  } = usePosts();

  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState<CommentData>({
    name: '',
    email: '',
    body: '',
  });

  const [hasNameError, setHasNameError] = useState('');
  const [hasEmailError, setHasEmailError] = useState('');
  const [hasBodyError, setHasBodyError] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(prevComment => ({
      ...prevComment,
      name: event.target.value,
    }));

    setHasNameError('');
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(prevComment => ({
      ...prevComment,
      email: event.target.value,
    }));

    setHasEmailError('');
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(prevComment => ({
      ...prevComment,
      body: event.target.value,
    }));

    setHasBodyError('');
  };

  const reset = () => {
    setComment({
      name: '',
      email: '',
      body: '',
    });
    setHasNameError('');
    setHasEmailError('');
    setHasBodyError('');
  };

  function addComment({
    postId,
    name: commentName,
    email: commentEmail,
    body,
  }: Comment) {
    setLoading(true);

    createComment({
      postId,
      name: commentName,
      email: commentEmail,
      body,
    })
      .then(newComment => {
        setPostComments([...postComments, newComment]);
      })
      .catch(() => {
        setErrorMessage(Errors.SomethingWrong);
      })
      .finally(() => {
        setLoading(false);

        setComment(prevComment => ({
          ...prevComment,
          body: '',
        }));
      });
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedPostId) {
      return;
    }

    const nameTrimmed = comment.name.trim();
    const emailTrimmed = comment.email.trim();
    const bodyTrimmed = comment.body.trim();

    if (!bodyTrimmed) {
      setHasBodyError(Errors.ErrorMessage);
    }

    if (nameTrimmed.length < 1) {
      setHasNameError(Errors.ErrorName);
      setComment(prevComment => ({
        ...prevComment,
        name: '',
      }));
    }

    if (emailTrimmed.length < 1) {
      setHasEmailError(Errors.ErrorEmail);
      setComment(prevComment => ({
        ...prevComment,
        email: '',
      }));
    }

    if (bodyTrimmed.length < 1) {
      setHasBodyError(Errors.ErrorMessage);
      setComment(prevComment => ({
        ...prevComment,
        body: '',
      }));

      return;
    }

    if (!nameTrimmed || !emailTrimmed || !bodyTrimmed) {
      setComment(prevComment => ({
        ...prevComment,
        body: '',
      }));
    }

    addComment({
      id: postComments.length,
      postId: selectedPostId,
      name: nameTrimmed,
      email: emailTrimmed,
      body: bodyTrimmed,
    });
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={reset}
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
            value={comment.name}
            onChange={handleNameChange}
            className={cn('input', {
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
            {Errors.ErrorName}
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
            value={comment.email}
            onChange={handleEmailChange}
            className={cn('input', {
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
            {Errors.ErrorEmail}
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
            value={comment.body}
            onChange={handleBodyChange}
            className={cn('textarea', {
              'is-danger': hasBodyError,
            })}
            style={{ resize: 'none' }}
          />
        </div>

        {hasBodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {Errors.ErrorMessage}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', {
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
