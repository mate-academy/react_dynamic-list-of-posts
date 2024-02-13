import classNames from 'classnames';
import React, { useState } from 'react';
import { Post } from '../types/Post';
import { createComment } from '../utils/api';
import { Comment } from '../types/Comment';
import { ERROR_MESSAGE } from '../variables';

interface Props {
  choosedPost: Post | null
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>
  setPostErrorMessage: React.Dispatch<React.SetStateAction<string>>
}

export const NewCommentForm: React.FC<Props> = ({
  choosedPost,
  setComments,
  setPostErrorMessage,
}) => {
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [commentBody, setCommentBody] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handlerChangeName(event: React.ChangeEvent<HTMLInputElement>) {
    setAuthorName(event.target.value);
  }

  function handlerChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setAuthorEmail(event.target.value);
  }

  function handlerChangeCommentBody(event:
  React.ChangeEvent<HTMLTextAreaElement>) {
    setCommentBody(event.target.value);
  }

  function handlerSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmit(true);

    if (authorName.trim()
      && authorEmail.trim()
      && commentBody.trim()) {
      setIsLoading(true);
      setPostErrorMessage('');

      createComment({
        postId: choosedPost?.id || 0,
        name: authorName,
        email: authorEmail,
        body: commentBody,
      }).then(newComment => {
        setComments(
          currentComments => [...currentComments, newComment],
        );
        setCommentBody('');
        setIsSubmit(false);
      }).catch(() => setPostErrorMessage(ERROR_MESSAGE))
        .finally(() => setIsLoading(false));
    }
  }

  function handlerClear() {
    setAuthorName('');
    setAuthorEmail('');
    setCommentBody('');
    setIsSubmit(false);
  }

  return (
    <form
      onSubmit={handlerSubmit}
      data-cy="NewCommentForm"
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            onChange={handlerChangeName}
            type="text"
            value={authorName}
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input',
              { 'is-danger': isSubmit && !authorName.trim() })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isSubmit && !authorName.trim() && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}

        </div>

        {isSubmit && !authorName.trim() && (
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
            onChange={handlerChangeEmail}
            value={authorEmail}
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input',
              {
                'is-danger': isSubmit
                  && !authorEmail.trim(),
              })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isSubmit && !authorEmail.trim() && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}

        </div>
        {isSubmit && !authorEmail.trim() && (
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
            value={commentBody}
            onChange={handlerChangeCommentBody}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('textarea',
              { 'is-danger': isSubmit && !commentBody.trim() })}
          />
        </div>
        {isSubmit && !commentBody.trim() && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link',
              { 'is-loading': isLoading })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handlerClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
