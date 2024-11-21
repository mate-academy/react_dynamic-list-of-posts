import classNames from 'classnames';
import React, { useState } from 'react';
import { createComment } from '../api/comments';
import { Comment } from '../types/Comment';

type Props = {
  postId: number | undefined;
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  comments,
  setComments,
}) => {
  const [authorName, setAuthorName] = useState<string>('');
  const [authorEmail, setAuthorEmail] = useState<string>('');
  const [commentBody, setCommentBody] = useState<string>('');

  const [errorAuthorName, setErrorAuthorName] = useState<boolean>(false);
  const [errorAuthorEmail, setErrorAuthorEmail] = useState<boolean>(false);
  const [errorCommentBody, setErrorCommentBody] = useState<boolean>(false);

  const [loadingNewComment, setLoadingNewComment] = useState<boolean>(false);

  function resetForm() {
    setAuthorName('');
    setAuthorEmail('');
    setCommentBody('');
    setErrorAuthorName(false);
    setErrorAuthorEmail(false);
    setErrorCommentBody(false);
  }

  function addComment() {
    setErrorAuthorName(!authorName);
    setErrorAuthorEmail(!authorEmail);
    setErrorCommentBody(!commentBody);

    if (!authorName || !authorEmail || !commentBody) {
      return;
    }

    setLoadingNewComment(true);
    if (postId) {
      createComment({
        postId,
        name: authorName,
        email: authorEmail,
        body: commentBody,
      })
        .then(res => {
          setComments([...comments, res]);
        })
        .finally(() => {
          setLoadingNewComment(false);
          setCommentBody('');
        });
    }
  }

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={event => {
        event.preventDefault();
        addComment();
      }}
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
            className={classNames('input', { 'is-danger': errorAuthorName })}
            value={authorName}
            onChange={event => {
              setAuthorName(event.target.value);
              setErrorAuthorName(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errorAuthorName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorAuthorName && (
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
            className={classNames('input', { 'is-danger': errorAuthorEmail })}
            value={authorEmail}
            onChange={event => {
              setAuthorEmail(event.target.value);
              setErrorAuthorEmail(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errorAuthorEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorAuthorEmail && (
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
              'is-danger': errorCommentBody,
            })}
            value={commentBody}
            onChange={event => {
              setCommentBody(event.target.value);
              setErrorCommentBody(false);
            }}
          />
        </div>

        {errorCommentBody && (
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
              'is-loading': loadingNewComment,
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
            onClick={resetForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
