import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { CommentsContext } from '../store/CommentsContext';
import { CommentData } from '../types/Comment';

export const NewCommentForm: React.FC = () => {
  const { addComment, isSubmiting } = useContext(CommentsContext);

  const [newComment, setNewComment] = useState<CommentData>({
    name: '',
    email: '',
    body: '',
  });
  const [formError, setFormError] = useState({
    nameError: false,
    emailError: false,
    bodyError: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Object.keys(newComment).map(key => {
      if (newComment[key as keyof CommentData] === '') {
        setFormError(prev => ({
          ...prev,
          [`${key}Error`]: true,
        }));
      } else {
        setFormError(prev => ({
          ...prev,
          [`${key}Error`]: false,
        }));
      }

      return formError;
    });

    if (!Object.values(formError).includes(true)) {
      addComment(newComment)
        .then(() => {
          setNewComment((prev) => {
            return {
              ...prev,
              body: '',
            };
          });
        });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement
  | HTMLTextAreaElement>) => {
    setNewComment((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const reset = () => {
    Object.keys(newComment).map(key => {
      setNewComment((prev) => ({
        ...prev,
        [key as keyof CommentData]: '',
      }));
      setFormError((prev) => ({
        ...prev,
        [`${key}Error` as keyof typeof formError]: false,
      }));

      return formError;
    });
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            value={newComment.name}
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': formError.nameError,
            })}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {(formError.nameError && isSubmiting) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {(formError.nameError && !isSubmiting) && (
          <p className="help is-danger" data-cy="errorPostMessage">
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
            value={newComment.email}
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': formError.emailError,
            })}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {(formError.emailError && isSubmiting) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {(formError.emailError && !isSubmiting) && (
          <p className="help is-danger" data-cy="errorPostMessage">
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
            value={newComment.body}
            placeholder="Type comment here"
            className={classNames('textarea', {
              'is-danger': formError.bodyError,
            })}
            onChange={handleChange}
          />
        </div>

        {(!isSubmiting && formError.bodyError) && (
          <p className="help is-danger" data-cy="errorPostMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': isSubmiting,
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
            onClick={reset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
