import React, { useState } from 'react';
import classNames from 'classnames';
import { createComment } from '../api/comments';
import { Comment } from '../types/Comment';

type Props = {
  addComment: (newComment: Comment) => void,
  selectedPostId: number,
};

export const NewCommentForm: React.FC<Props> = ({
  addComment,
  selectedPostId,
}) => {
  const [isNameError, setIsNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isCommentTextError, setIsCommentTextError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newComment, setNewComment] = useState({
    postId: 0,
    name: '',
    email: '',
    body: '',
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (newComment && !newComment.name.trim()) {
      setIsNameError(true);
    }

    if (newComment && !newComment.email.trim()) {
      setIsEmailError(true);
    }

    if (newComment && !newComment.body.trim()) {
      setIsCommentTextError(true);
    }

    if (newComment
      && newComment.name.trim()
      && newComment.email.trim()
      && newComment.body.trim()) {
      setIsLoading(true);

      createComment(
        {
          name: newComment.name,
          email: newComment.email,
          body: newComment.body,
        },
        selectedPostId,
      ).then((comment) => {
        addComment({ ...comment });

        setIsNameError(false);
        setIsEmailError(false);
        setIsCommentTextError(false);
        setNewComment({
          ...newComment,
          body: '',
        });
      })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleClearForm = () => {
    setNewComment({
      postId: selectedPostId,
      name: '',
      email: '',
      body: '',
    });
    setIsNameError(false);
    setIsEmailError(false);
    setIsCommentTextError(false);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setNewComment({
      ...newComment,
      [name]: value,
    });

    switch (name) {
      case 'name':
        setIsNameError(false);
        break;

      case 'email':
        setIsEmailError(false);
        break;

      case 'body':
        setIsCommentTextError(false);
        break;

      default:
        break;
    }
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
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames(
              'input',
              {
                'is-danger': isNameError,
              },
            )}
            value={newComment.name}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isNameError && (
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
            className={classNames(
              'input',
              {
                'is-danger': isEmailError,
              },
            )}
            value={newComment.email}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isEmailError && (
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
            className={classNames(
              'textarea',
              {
                'is-danger': isCommentTextError,
              },
            )}
            value={newComment.body}
            onChange={handleChange}
          />
        </div>

        {isCommentTextError && (
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
              'button',
              'is-link',
              {
                'is-loading': isLoading,
              },
            )}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
