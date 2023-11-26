import React, { useState } from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { addComment } from '../services/comments';

type Props = {
  selectedPost: Post | null;
  addNewComment: (newComment: Comment) => void;
  handleSetError: () => void;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPost,
  addNewComment,
  handleSetError,
}) => {
  const [queryName, setQueryName] = useState('');
  const [queryEmail, setQueryEmail] = useState('');
  const [queryComment, setQueryComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [isNameInputError, setNameInputError] = useState(false);
  const [isEmailInputError, setEmailInputError] = useState(false);
  const [isCommentInputError, setCommentInputError] = useState(false);

  const handleReset = () => {
    setQueryName('');
    setQueryEmail('');
    setQueryComment('');
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameInputError(false);
    setQueryName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInputError(false);
    setQueryEmail(event.target.value);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCommentInputError(false);
    setQueryComment(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setNameInputError(!queryName);
    setEmailInputError(!queryEmail);
    setCommentInputError(!queryComment);

    if (!queryName || !queryEmail || !queryComment) {
      return;
    }

    setIsLoading(true);

    if (selectedPost) {
      const newComment: Omit<Comment, 'id'> = {
        postId: selectedPost.id,
        name: queryName,
        email: queryEmail,
        body: queryComment,
      };

      addComment(newComment)
        .then((newCommentFromServer) => {
          addNewComment(newCommentFromServer);
          setQueryComment('');
        })
        .catch(() => handleSetError())
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleFormSubmit}
      onReset={handleReset}
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
              { 'is-danger': isNameInputError },
            )}
            onChange={handleNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isNameInputError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isNameInputError && (
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
            className={classNames(
              'input',
              { 'is-danger': isEmailInputError },
            )}
            onChange={handleEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isEmailInputError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}

        </div>

        {isEmailInputError && (
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
              { 'is-danger': isCommentInputError },
            )}
            onChange={handleCommentChange}
          />
        </div>

        {isCommentInputError && (
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
              'button is-link',
              { 'is-loading': isLoading },
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
            onClick={() => handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
