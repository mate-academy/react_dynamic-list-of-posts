import React, { useState } from 'react';
import cn from 'classnames';
import { Comment } from '../../types/Comment';
import { postComment } from '../../utils/commentsApi';

type Props = {
  setComments: (comments: Comment[]) => void;
  comments: Comment[];
  postId: number;
};

export const NewCommentForm: React.FC<Props> = ({
  setComments,
  comments,
  postId,
}) => {
  const [queryName, setQueryName] = useState('');
  const [queryEmail, setQueryEmail] = useState('');
  const [queryComment, setQueryComment] = useState('');

  const [errorQueryName, setErrorQueryName] = useState(false);
  const [errorQueryEmail, setErrorQueryEmail] = useState(false);
  const [errorQueryComment, setErrorQueryComment] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isErrorOnSubmit, setIsErrorOnSubmit] = useState(false);

  const handleQueryName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorQueryName(false);
    setQueryName(event.target.value);
  };

  const handleQueryEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorQueryEmail(false);
    setQueryEmail(event.target.value);
  };

  const handleQueryComment = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setErrorQueryComment(false);
    setQueryComment(event.target.value);
  };

  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!queryName.trim()) {
      setErrorQueryName(true);
    }

    if (!queryEmail.trim()) {
      setErrorQueryEmail(true);
    }

    if (!queryComment.trim()) {
      setErrorQueryComment(true);
    }

    if (!queryName.trim() || !queryEmail.trim() || !queryComment.trim()) {
      return;
    }

    try {
      setIsLoading(true);
      setIsErrorOnSubmit(false);

      const newComment = {
        name: queryName,
        email: queryEmail,
        body: queryComment,
        postId,
      };

      const newCommentFromServer = await postComment(newComment);

      setComments([...comments, newCommentFromServer]);
    } catch {
      setIsErrorOnSubmit(true);
    } finally {
      setQueryComment('');
      setIsLoading(false);
    }
  };

  const handleClearButton = () => {
    setQueryName('');
    setQueryEmail('');
    setQueryComment('');

    setErrorQueryName(false);
    setErrorQueryEmail(false);
    setErrorQueryComment(false);
  };

  return (
    <>
      <form
        data-cy="NewCommentForm"
        onSubmit={handleSubmitForm}
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
              className={cn('input', {
                'is-danger': errorQueryName,
              })}
              value={queryName}
              onChange={handleQueryName}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>

            {errorQueryName && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}

          </div>
          {errorQueryName && (
            <p
              className="help is-danger"
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
              className={cn('input', {
                'is-danger': errorQueryEmail,
              })}
              value={queryEmail}
              onChange={handleQueryEmail}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>

            {errorQueryEmail && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>

          {errorQueryEmail && (
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
              className={cn('textarea', {
                'is-danger': errorQueryComment,
              })}
              value={queryComment}
              onChange={handleQueryComment}
            />
          </div>

          {errorQueryComment && (
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
              onClick={handleClearButton}
            >
              Clear
            </button>
          </div>
        </div>
      </form>

      {!isLoading && isErrorOnSubmit && (
        <div className="notification is-danger">
          Cannot add comment
        </div>
      )}
    </>
  );
};
