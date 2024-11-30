import React, { useState, Dispatch, SetStateAction } from 'react';
import cn from 'classnames';
import { Comment } from '../types/Comment';
import { createComment } from '../api/comments';

type Props = {
  setComments: Dispatch<SetStateAction<Comment[]>>;
  activePostId: number;
  setErrorMessage: (m: string) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  setComments,
  activePostId,
  setErrorMessage,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [commentName, setCommentName] = useState('');
  const [isNameHasError, setIsNameHasError] = useState(false);
  const [commentEmail, setCommentEmail] = useState('');
  const [isEmailHasError, setIsEmailHasError] = useState(false);
  const [commentBody, setCommentBody] = useState('');
  const [isBodyHasError, setIsBodyHasError] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsNameHasError(false);
    setCommentName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEmailHasError(false);
    setCommentEmail(event.target.value);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsBodyHasError(false);
    setCommentBody(event.target.value);
  };

  function addComment({ postId, name, email, body }: Omit<Comment, 'id'>) {
    setIsLoading(true);

    createComment({ postId, name, email, body })
      .then(newComment => {
        setComments(currentComments => [...currentComments, newComment]);
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => {
        setIsLoading(false);
        setCommentBody('');
      });
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsNameHasError(!commentName.trim());
    setIsEmailHasError(!commentEmail.trim());
    setIsBodyHasError(!commentBody.trim());

    if (!commentName.trim() || !commentEmail.trim() || !commentBody.trim()) {
      return;
    }

    addComment({
      postId: activePostId,
      name: commentName,
      email: commentEmail,
      body: commentBody,
    });
  };

  const handleReset = () => {
    setCommentName('');
    setCommentBody('');
    setCommentEmail('');
    setIsNameHasError(false);
    setIsEmailHasError(false);
    setIsBodyHasError(false);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={handleReset}
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
            className={cn('input', { 'is-danger': isNameHasError })}
            value={commentName}
            onChange={handleNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isNameHasError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isNameHasError && (
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
            className={cn('input', { 'is-danger': isEmailHasError })}
            value={commentEmail}
            onChange={handleEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isEmailHasError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isEmailHasError && (
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
            className={cn('textarea', { 'is-danger': isBodyHasError })}
            value={commentBody}
            onChange={handleBodyChange}
          />
        </div>

        {isBodyHasError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link ', { 'is-loading': isLoading })}
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
