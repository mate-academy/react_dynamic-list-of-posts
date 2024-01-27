import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { Comment } from '../types/Comment';
import { addComment } from '../api/comments';

type Props = {
  postId: number,
  setIsError: (err: boolean) => void,
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  setIsError,
  setComments,
}) => {
  const [authorName, setAuthorName] = useState('');
  const [isNameError, setIsNameError] = useState(false);
  const [authorEmail, setAuthorEmail] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);
  const [comment, setComment] = useState('');
  const [isCommentError, setIsCommentError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isNameError) {
        setIsNameError(false);
      }

      setAuthorName(event.target.value);
    },
    [isNameError],
  );

  const onEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isEmailError) {
        setIsEmailError(false);
      }

      setAuthorEmail(event.target.value);
    },
    [isEmailError],
  );

  const onCommentChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (isCommentError) {
        setIsCommentError(false);
      }

      setComment(event.target.value);
    },
    [isCommentError],
  );

  const onFormClear = useCallback((event?: React.FormEvent) => {
    event?.preventDefault();

    setAuthorName('');
    setAuthorEmail('');
    setComment('');
    setIsNameError(false);
    setIsEmailError(false);
    setIsCommentError(false);
  }, []);

  const onFormSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    setIsError(false);

    setIsNameError(!authorName);
    setIsEmailError(!authorEmail);
    setIsCommentError(!comment);

    if (!authorName || !authorEmail || !comment) {
      return;
    }

    setIsLoading(true);

    const newComment: Omit<Comment, 'id'> = {
      name: authorName,
      email: authorEmail,
      body: comment,
      postId,
    };

    addComment(newComment)
      .then((addedComment) => {
        setComments(currentComments => [...currentComments, addedComment]);
        setComment('');
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [
    authorName,
    authorEmail,
    comment,
    postId,
    setIsError,
    setComments,
  ]);

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={onFormSubmit}
      onReset={onFormClear}
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
              'is-danger': isNameError,
            })}
            value={authorName}
            onChange={onNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isNameError && (
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
            className={classNames('input', {
              'is-danger': isEmailError,
            })}
            value={authorEmail}
            onChange={onEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isEmailError && (
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
            className={classNames('textarea', {
              'is-danger': isCommentError,
            })}
            value={comment}
            onChange={onCommentChange}
          />
        </div>

        {isCommentError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}

      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
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
            disabled={isLoading}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
