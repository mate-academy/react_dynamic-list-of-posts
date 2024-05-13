/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';

import { Comment } from '../types/Comment';
import classNames from 'classnames';

export const NewCommentForm: React.FC<{
  addComment(newComment: Partial<Comment>): Promise<boolean>;
}> = ({ addComment }) => {
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    body: '',
  });
  const [commentWarnings, setCommentWarnings] = useState({
    name: false,
    email: false,
    body: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = ({ target }) => {
    setNewComment(prevComment => ({
      ...prevComment,
      [target.name]: target.value,
    }));
    setCommentWarnings(prevWarnings => ({
      ...prevWarnings,
      [target.name]: false,
    }));
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    Object.entries(newComment).forEach(([fieldName, val]) => {
      if (val === '') {
        setCommentWarnings(prevWarnings => ({
          ...prevWarnings,
          [fieldName]: true,
        }));
      }
    });

    if (commentWarnings.name || commentWarnings.email || commentWarnings.body) {
      return;
    }

    setIsLoading(true);
    addComment(newComment).then(hasSucceeded => {
      if (hasSucceeded) {
        setNewComment(prevComment => ({
          ...prevComment,
          body: '',
        }));
      }

      setIsLoading(false);
    });
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleFormSubmit}>
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
              'is-danger': commentWarnings.name,
            })}
            onChange={handleInputChange}
            value={newComment.name}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {commentWarnings.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {commentWarnings.name && (
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
              'is-danger': commentWarnings.email,
            })}
            onChange={handleInputChange}
            value={newComment.email}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {commentWarnings.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {commentWarnings.email && (
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
              'is-danger': commentWarnings.body,
            })}
            onChange={handleInputChange}
            value={newComment.body}
          />
        </div>

        {commentWarnings.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link ', {
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
            onClick={() => {
              setNewComment({
                name: '',
                email: '',
                body: '',
              });

              setCommentWarnings({
                name: false,
                email: false,
                body: false,
              });
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
