import React, { FormEvent, useState } from 'react';
import { Comment, CommentData } from '../types/Comment';
import classNames from 'classnames';
import { createComment } from '../api/api';

type Props = {
  postId: number;
  addComment: (comment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, addComment }) => {
  const [comment, setComment] = useState<CommentData>({
    email: '',
    body: '',
    name: '',
    postId,
  });
  const [isNameError, setIsNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isBodyError, setIsBodyError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPostError, setIsPostError] = useState(false);

  const clearAllError = () => {
    setIsLoading(false);
    setIsBodyError(false);
    setIsNameError(false);
    setIsEmailError(false);
  };

  const submitComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comment.name) {
      setIsNameError(true);
    }

    if (!comment.email) {
      setIsEmailError(true);
    }

    if (!comment.body) {
      setIsBodyError(true);
    }

    if (!comment.name || !comment.email || !comment.body) {
      return;
    }

    setIsLoading(true);

    createComment(comment)
      .then(result => {
        addComment({ ...comment, id: result.id });
        setComment(prev => ({ ...prev, body: '' }));
      })
      .catch(() => {
        setIsPostError(true);
        setTimeout(() => {
          setIsPostError(false);
        }, 3000);
      })
      .finally(() => {
        clearAllError();
      });
  };

  const reset = () => {
    clearAllError();
    setComment({
      email: '',
      body: '',
      name: '',
      postId,
    });
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={submitComment} onReset={reset}>
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
              'is-danger': isNameError && !comment.name,
            })}
            value={comment.name}
            onChange={e =>
              setComment(prev => ({ ...prev, name: e.target.value }))
            }
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isNameError && !comment.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isNameError && !comment.name && (
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
              'is-danger': isEmailError && !comment.email,
            })}
            value={comment.email}
            onChange={e =>
              setComment(prev => ({ ...prev, email: e.target.value }))
            }
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isEmailError && !comment.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isEmailError && !comment.email && (
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
              'is-danger': isBodyError && !comment.body,
            })}
            value={comment.body}
            onChange={e =>
              setComment(prev => ({ ...prev, body: e.target.value }))
            }
          />
        </div>

        {isBodyError && !comment.body && (
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
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>

      {isPostError && (
        <div className="notification is-danger">Something went wrong</div>
      )}
    </form>
  );
};
