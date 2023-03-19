/* eslint-disable no-alert */
/* eslint-disable no-console */
import classNames from 'classnames';
import React, { useState } from 'react';
import { addComment } from '../api/coment';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  setComments: (args: Comment[]) => void;
  comments: Comment[];
  setIsErrorSide: (args: boolean) => void;
  openedPost: Post | null;
};

export const NewCommentForm: React.FC<Props> = ({
  setComments,
  comments,
  setIsErrorSide,
  openedPost,
}) => {
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmptyName, setIsEmptyName] = useState(false);
  const [isEmptyEmail, setIsEmptyEmail] = useState(false);
  const [isEmptyBody, setIsEmptyBody] = useState(false);

  const setAllFieldsNotEmpty = () => {
    setIsEmptyName(false);
    setIsEmptyEmail(false);
    setIsEmptyBody(false);
  };

  const addNewComment = () => {
    if (authorName && commentText && authorEmail) {
      const commentData = {
        postId: openedPost?.id,
        name: authorName,
        email: authorEmail,
        body: commentText,
      };

      setAllFieldsNotEmpty();
      setIsLoading(true);
      addComment(commentData)
        .then((data) => {
          if (data) {
            setComments([...comments, data]);
          } else {
            throw new Error('Failed to add comment.');
          }
        })
        .catch((error) => {
          console.error(error);
          setIsErrorSide(true);
          alert('Failed to add comment. Please try again later.');
        })
        .finally(() => {
          setIsLoading(false);
          setCommentText('');
        });
    } else {
      setIsEmptyName(!authorName);
      setIsEmptyEmail(!authorEmail);
      setIsEmptyBody(!commentText);
    }
  };

  const handleResetForm = () => {
    setAllFieldsNotEmpty();

    setAuthorName('');
    setAuthorEmail('');
    setCommentText('');
  };

  return (
    <form data-cy="NewCommentForm">
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
        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames(
              'input',
              { 'is-danger': isEmptyName && !authorName },
            )}
            value={authorName}
            onChange={(event) => {
              setAuthorName(event.target.value);
              setIsEmptyName(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {(isEmptyName && !authorName) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {(isEmptyName && !authorName) && (
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
        <div className="control has-icons-left has-icons-right">
          <input
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames(
              'input',
              { 'is-danger': isEmptyEmail && !authorEmail },
            )}
            value={authorEmail}
            onChange={(event) => {
              setAuthorEmail(event.target.value);
              setIsEmptyEmail(false);
            }}
            onBlur={(event) => {
              const email = event.target.value;

              if (email) {
                const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

                if (!isValidEmail) {
                  setIsEmptyEmail(true);
                  setAuthorEmail('');
                  alert('Please enter a valid email address.');
                }
              }
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {(isEmptyEmail && !authorEmail) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {(isEmptyEmail && !authorEmail) && (
          <p
            className="help is-danger"
            data-cy="ErrorMessage"
          >
            Email is required
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
            placeholder="Type comment here"
            className={classNames(
              'textarea',
              { 'is-danger': isEmptyBody && !commentText },
            )}
            value={commentText}
            onChange={(event) => {
              setCommentText(event.target.value);
              setIsEmptyBody(false);
            }}
          />
        </div>

        {(isEmptyBody && !commentText) && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
              'button is-link',
              { 'is-loading': isLoading },
            )}
            onClick={(event) => {
              event.preventDefault();
              addNewComment();
            }}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={(event) => {
              event.preventDefault();
              handleResetForm();
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
