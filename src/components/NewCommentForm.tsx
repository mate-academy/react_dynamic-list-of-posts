import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';
import classNames from 'classnames';

type Props = {
  selectedPostId: number;
  onAddComment: (comment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  onAddComment,
}) => {
  const initialComment: Omit<Comment, 'id'> = {
    postId: selectedPostId,
    name: '',
    email: '',
    body: '',
  };

  const initialError = {
    name: false,
    email: false,
    body: false,
  };

  type ErrorState = typeof initialError;

  const [newComment, setNewComment] = useState(initialComment);
  const [error, setError] = useState(initialError);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    for (const key in newComment) {
      if (!newComment[key as keyof Omit<Comment, 'id'>]) {
        setError(prevError => {
          return { ...prevError, [key]: true };
        });
      }
    }

    for (const key in error) {
      if (error[key as keyof ErrorState]) {
        return;
      }
    }

    client
      .post<Comment>('/comments', newComment)
      .then(addedComment => {
        onAddComment(addedComment);
        setNewComment(prevComment => {
          return { ...prevComment, body: '' };
        });
      })
      .finally(() => setIsLoading(false));
  };

  const handleChangeNewComment = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setError(prevError => {
      return { ...prevError, [name]: false };
    });
    setNewComment(prevComment => {
      return { ...prevComment, [name]: value };
    });
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
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
            className={classNames('input', { 'is-danger': error.name })}
            value={newComment.name}
            onChange={handleChangeNewComment}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {error.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {error.name && (
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
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': error.email })}
            value={newComment.email}
            onChange={handleChangeNewComment}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {error.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {error.email && (
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
            className={classNames('textarea', { 'is-danger': error.body })}
            value={newComment.body}
            onChange={handleChangeNewComment}
          />
        </div>

        {error.body && (
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
              setNewComment(initialComment);
              setError(initialError);
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
