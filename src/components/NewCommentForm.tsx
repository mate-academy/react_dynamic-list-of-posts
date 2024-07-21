import React, { useCallback, useState } from 'react';
import cn from 'classnames';
import { Comment } from '../types/Comment';
import { postComment } from '../api/comments';

interface Props {
  postId: number;
  setComments: (callback: (currentComments: Comment[]) => Comment[]) => void;
  setIsCommentsError: (value: boolean) => void;
}

export const NewCommentForm: React.FC<Props> = ({
  postId,
  setComments,
  setIsCommentsError,
}) => {
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [commentBody, setCommentBody] = useState('');
  const [isAuthorNameError, setIsAuthorNameError] = useState(false);
  const [isAuthorEmailError, setIsAuthorEmailError] = useState(false);
  const [isCommentBodyError, setIsCommentBodyError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsAuthorNameError(false);
      setAuthorName(e.target.value);
    },
    [],
  );

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsAuthorEmailError(false);
      setAuthorEmail(e.target.value);
    },
    [],
  );

  const handleBodyChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setIsCommentBodyError(false);
      setCommentBody(e.target.value);
    },
    [],
  );

  const handleSubmit = useCallback(
    (
      e: React.FormEvent<HTMLFormElement>,
      name: string,
      email: string,
      body: string,
      id: number,
    ) => {
      e.preventDefault();

      if (!name.trim()) {
        setIsAuthorNameError(true);
      }

      if (!email.trim()) {
        setIsAuthorEmailError(true);
      }

      if (!body.trim()) {
        setIsCommentBodyError(true);
      }

      if (!name.trim() || !email.trim() || !body.trim()) {
        return;
      }

      setIsLoading(true);
      postComment({ name, email, body, postId: id })
        .then(newComment => {
          setCommentBody('');
          setComments(currentComments => [...currentComments, newComment]);
        })
        .catch(error => {
          setIsCommentsError(true);
          throw error;
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [setComments, setIsCommentsError],
  );

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={e =>
        handleSubmit(e, authorName, authorEmail, commentBody, postId)
      }
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
            className={cn('input', { 'is-danger': isAuthorNameError })}
            value={authorName}
            onChange={handleNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isAuthorNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isAuthorNameError && (
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
            className={cn('input', { 'is-danger': isAuthorEmailError })}
            value={authorEmail}
            onChange={handleEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isAuthorEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isAuthorEmailError && (
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
            className={cn('textarea', { 'is-danger': isCommentBodyError })}
            value={commentBody}
            onChange={handleBodyChange}
          />
        </div>

        {isCommentBodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button', 'is-link', { 'is-loading': isLoading })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
