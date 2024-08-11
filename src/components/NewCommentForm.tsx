import React, { ChangeEvent, useState } from 'react';
import { newComment } from '../api/comment';
import { Comment, CommentData } from '../types/Comment';
import classNames from 'classnames';

type Props = {
  postId: number;
  setComment: React.Dispatch<React.SetStateAction<Comment[]>>;
  setError: (value: boolean) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  setComment,
  setError,
}) => {
  const [addComment, setaddComment] = useState<CommentData>({
    name: '',
    email: '',
    body: '',
  });
  const [commentError, setCommentError] = useState({
    name: false,
    email: false,
    body: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setaddComment(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });

    setCommentError(prev => {
      return {
        ...prev,
        [name]: false,
      };
    });
  };

  const handleClearComment = () => {
    setaddComment({
      name: '',
      email: '',
      body: '',
    });

    setCommentError({
      name: false,
      email: false,
      body: false,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedName = addComment.name.trim();
    const trimmedEmail = addComment.email.trim();
    const trimmedBody = addComment.body.trim();

    if (!trimmedName || !trimmedEmail || !trimmedBody) {
      if (!trimmedName) {
        setCommentError(prev => {
          return {
            ...prev,
            name: true,
          };
        });
      }

      if (!trimmedEmail) {
        setCommentError(prev => {
          return {
            ...prev,
            email: true,
          };
        });
      }

      if (!trimmedBody) {
        setCommentError(prev => {
          return {
            ...prev,
            body: true,
          };
        });
      }

      return;
    }

    setIsLoading(true);

    newComment({
      postId,
      name: addComment.name,
      email: addComment.email,
      body: addComment.body,
    })
      .then(comment => {
        setComment(currentComments => [...currentComments, comment]);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
        setaddComment(prev => {
          return {
            ...prev,
            body: '',
          };
        });
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
            className={classNames('input', {
              'is-danger': commentError.name,
            })}
            value={addComment.name}
            onChange={handleOnChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {commentError.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {commentError.name && (
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
              'is-danger': commentError.email,
            })}
            value={addComment.email}
            onChange={handleOnChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {commentError.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {commentError.email && (
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
              'is-danger': commentError.body,
            })}
            value={addComment.body}
            onChange={handleOnChange}
          />
        </div>

        {commentError.body && (
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
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClearComment}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
