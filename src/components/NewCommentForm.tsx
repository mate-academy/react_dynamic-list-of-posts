import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { createComment } from '../api/comments';
import { SelectedPostContext } from '../providers/PostProvider';
import { Comment } from '../types/Comment';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

type Props = {
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export const NewCommentForm: React.FC<Props> = ({ setComments }) => {
  const [author, setAuthor] = useState({
    name: '',
    email: '',
    comment: '',
  });

  const [error, setError] = useState({
    name: '',
    email: '',
    comment: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const { selectedPost } = useContext(SelectedPostContext);

  const isEmailValid = EMAIL_REGEX.test(author.email.trim());

  const handleAuthNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(prevError => ({
      ...prevError,
      name: '',
    }));
    setAuthor(prevAuthor => ({
      ...prevAuthor,
      name: event.target.value,
    }));
  };

  const handleAuthEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setError(prevError => ({
      ...prevError,
      email: '',
    }));
    setAuthor(prevAuthor => ({
      ...prevAuthor,
      email: event.target.value,
    }));
  };

  const handleAuthCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setError(prevError => ({
      ...prevError,
      commentError: '',
    }));
    setAuthor(prevAuthor => ({
      ...prevAuthor,
      comment: event.target.value,
    }));
  };

  const handleClearForm = () => {
    setAuthor({
      name: '',
      email: '',
      comment: '',
    });
    setError({
      name: '',
      email: '',
      comment: '',
    });
  };

  const handleAddingComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedAuthName = author.name.trim();
    const normalizedAuthEmail = author.email.trim();
    const normalizedAuthComment = author.comment.trim();

    if (!normalizedAuthName) {
      setError(prevError => ({
        ...prevError,
        name: 'Name is required',
      }));
    }

    if (!normalizedAuthEmail) {
      setError(prevError => ({
        ...prevError,
        email: 'Email is required',
      }));
    }

    if (!isEmailValid && !!normalizedAuthEmail.length) {
      setError(prevError => ({
        ...prevError,
        email: 'Email should be valid',
      }));
    }

    if (!normalizedAuthComment) {
      setError(prevError => ({
        ...prevError,
        comment: 'Enter some text',
      }));
    }

    if (
      !normalizedAuthName
      || !normalizedAuthEmail
      || !isEmailValid
      || !normalizedAuthComment
    ) {
      return;
    }

    setIsLoading(true);

    if (!selectedPost) {
      setIsLoading(false);

      return;
    }

    createComment({
      name: normalizedAuthName,
      email: normalizedAuthEmail,
      body: normalizedAuthComment,
      postId: selectedPost.id,
    })
      .then((newComment) => {
        setAuthor(prevAuthor => ({
          ...prevAuthor,
          comment: '',
        }));
        setComments((prevComments) => {
          return [...prevComments, newComment];
        });
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.error('Failed to add comment');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleAddingComment}
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
              'is-danger': !!error.name.length,
            })}
            value={author.name}
            onChange={handleAuthNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!!error.name.length && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!!error.name.length && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {error.name}
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
              'is-danger': !!error.email.length,
            })}
            value={author.email}
            onChange={handleAuthEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {!!error.email.length && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!!error.email.length && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {error.email}
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
              'is-danger': !!error.comment.length,
            })}
            value={author.comment}
            onChange={handleAuthCommentChange}
          />
        </div>

        {!!error.comment.length && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {error.comment}
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
            onClick={handleClearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
