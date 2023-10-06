import classNames from 'classnames';
import React, { useState } from 'react';
import * as commentService from '../services/comments';
import { usePosts } from './PostContext';
import { CommentData } from '../types/Comment';
import { ErrorNotification } from './ErrorNotification';

type Props = {
  errorMessage: string,
  onFail: (message: string) => void,
};

export const NewCommentForm: React.FC<Props> = ({
  errorMessage,
  onFail = () => {},
}) => {
  const {
    selectedPost,
    comments,
    setComments,
  } = usePosts();
  const postId = selectedPost?.id || 0;

  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [bodyErrorMessage, setBodyErrorMessage] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameErrorMessage('');
    setAuthorName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailErrorMessage('');
    setAuthorEmail(event.target.value);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setBodyErrorMessage('');
    setNewCommentText(event.target.value);
  };

  const clearFields = () => {
    setAuthorName('');
    setAuthorEmail('');
    setNewCommentText('');
    setBodyErrorMessage('');
    setEmailErrorMessage('');
    setNameErrorMessage('');
  };

  const addComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newComment: CommentData = {
      postId,
      name: authorName,
      email: authorEmail,
      body: newCommentText,
    };

    if (!authorName) {
      setNameErrorMessage('Name is required');
    }

    if (!authorEmail) {
      setEmailErrorMessage('Email is required');
    }

    if (!newCommentText) {
      setBodyErrorMessage('Enter some text');
    }

    if (!authorEmail || !authorName || !newCommentText) {
      return;
    }

    setIsLoading(true);

    commentService.addComment(newComment)
      .then((createdComment) => {
        const updatedComments = [...comments, createdComment];

        setComments(updatedComments);
      })
      .catch(() => {
        onFail('Something went wrong!');
      })
      .finally(() => {
        setIsLoading(false);
        setNewCommentText('');
      });
  };

  return (
    <>
      {errorMessage ? (
        <ErrorNotification />
      ) : (
        <form
          data-cy="NewCommentForm"
          onSubmit={addComment}
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
                  'is-danger': nameErrorMessage,
                })}
                value={authorName}
                onChange={handleNameChange}
              />

              <span className="icon is-small is-left">
                <i className="fas fa-user" />
              </span>

              {nameErrorMessage && (
                <span
                  className="icon is-small is-right has-text-danger"
                  data-cy="ErrorIcon"
                >
                  <i className="fas fa-exclamation-triangle" />
                </span>
              )}
            </div>

            <p className="help is-danger" data-cy="ErrorMessage">
              {nameErrorMessage}
            </p>
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
                  'is-danger': emailErrorMessage,
                })}
                value={authorEmail}
                onChange={handleEmailChange}
              />

              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>

              {emailErrorMessage && (
                <span
                  className="icon is-small is-right has-text-danger"
                  data-cy="ErrorIcon"
                >
                  <i className="fas fa-exclamation-triangle" />
                </span>
              )}
            </div>

            <p className="help is-danger" data-cy="ErrorMessage">
              {emailErrorMessage}
            </p>
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
                  'is-danger': bodyErrorMessage,
                })}
                value={newCommentText}
                onChange={handleCommentChange}
              />
            </div>

            {bodyErrorMessage && (
              <p className="help is-danger" data-cy="ErrorMessage">
                {bodyErrorMessage}
              </p>
            )}
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button
                type="submit"
                className={classNames('button is-link', {
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
                onClick={clearFields}
              >
                Clear
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};
