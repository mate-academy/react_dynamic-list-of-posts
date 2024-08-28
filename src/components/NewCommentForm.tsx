import classNames from 'classnames';
import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { Post } from '../types/Post';
import { addNewComment } from '../utils/fetchClient';
import { Comment } from '../types/Comment';
import { ErrorMessage } from '../helper/ErrorMessage';

type Props = {
  selectedUserPost: Post | null;
  setCommentsOfPostId: Dispatch<SetStateAction<Comment[]>>;
  setErrorMessage: (error: string) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedUserPost,
  setCommentsOfPostId,
  setErrorMessage,
}) => {
  const [commentAuthorName, setCommentAuthorName] = useState('');
  const [commentAuthorEmail, setCommentAuthorEmail] = useState('');
  const [commentAuthorText, setCommentAuthorText] = useState('');
  const [isCommentAuthorNameHasError, setIsCommentAuthorNameHasError] =
    useState(false);
  const [isCommentAuthorEmailHasError, setIsCommentAuthorEmailHasError] =
    useState(false);
  const [isCommentAuthorTextHasError, setIsCommentAuthorTextHasError] =
    useState(false);
  const [isNewCommentLoading, setIsNewCommentLoading] = useState(false);

  function handleClearFormButton() {
    setCommentAuthorEmail('');
    setCommentAuthorName('');
    setCommentAuthorText('');
    setIsCommentAuthorEmailHasError(false);
    setIsCommentAuthorNameHasError(false);
    setIsCommentAuthorTextHasError(false);
  }

  const handleAddCommentButton = (event: FormEvent) => {
    event.preventDefault();

    if (!Boolean(commentAuthorName.trim().length)) {
      setIsCommentAuthorNameHasError(true);
    }

    if (!Boolean(commentAuthorEmail.trim().length)) {
      setIsCommentAuthorEmailHasError(true);
    }

    if (!Boolean(commentAuthorText.trim().length)) {
      setIsCommentAuthorTextHasError(true);
    }

    if (
      Boolean(commentAuthorName.trim().length) &&
      Boolean(commentAuthorEmail.trim().length) &&
      Boolean(commentAuthorText.trim().length) &&
      selectedUserPost !== null
    ) {
      const newComment = {
        postId: selectedUserPost.id,
        name: commentAuthorName,
        email: commentAuthorEmail,
        body: commentAuthorText,
        id: 0,
      };

      setIsNewCommentLoading(true);

      addNewComment({
        postId: selectedUserPost.id,
        name: commentAuthorName,
        email: commentAuthorEmail,
        body: commentAuthorText,
      })
        .then(() => {
          setCommentsOfPostId(comments => [...comments, newComment]);
          setCommentAuthorText('');
        })
        .catch(() => setErrorMessage(ErrorMessage.LoadingError))
        .finally(() => setIsNewCommentLoading(false));
    }
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleAddCommentButton}>
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
            value={commentAuthorName}
            className={classNames('input', {
              'is-danger': isCommentAuthorNameHasError,
            })}
            onChange={event => {
              setCommentAuthorName(event.target.value);
              setIsCommentAuthorNameHasError(false);
              setErrorMessage('');
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isCommentAuthorNameHasError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isCommentAuthorNameHasError && (
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
            value={commentAuthorEmail}
            className={classNames('input', {
              'is-danger': isCommentAuthorEmailHasError,
            })}
            onChange={event => {
              setCommentAuthorEmail(event.target.value);
              setIsCommentAuthorEmailHasError(false);
              setErrorMessage('');
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isCommentAuthorEmailHasError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isCommentAuthorEmailHasError && (
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
            value={commentAuthorText}
            className={classNames('textarea', {
              'is-danger': isCommentAuthorTextHasError,
            })}
            onChange={event => {
              setCommentAuthorText(event.target.value);
              setIsCommentAuthorTextHasError(false);
              setErrorMessage('');
            }}
          />
        </div>

        {isCommentAuthorTextHasError && (
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
              'is-loading': isNewCommentLoading,
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
            onClick={handleClearFormButton}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
