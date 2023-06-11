import classNames from 'classnames';
import React, { FormEvent, useState } from 'react';
import { createComment } from '../api';
import { Comment } from '../types/Comment';

type Props = {
  selectedPostId: number,
  onAddComment: (arg: Comment | null) => void,
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  onAddComment,
}) => {
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentAuthorsEmail, setCommentAuthorsEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isCommentAuthorsNameEmpty, setisAuthorNameEmpty] = useState(false);
  const [isAuthorsEmailEmpty, setIsAuthorsEmailEmpty] = useState(false);
  const [isCommentTextEmpty, setIsCommentTextEmpty] = useState(false);
  const [isCommentAdding, setIsCommentAdding] = useState(false);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!commentAuthor.trim()) {
      setisAuthorNameEmpty(true);
      setCommentAuthor('');
    }

    if (!commentAuthorsEmail.trim()) {
      setIsAuthorsEmailEmpty(true);
      setCommentAuthorsEmail('');
    }

    if (!commentText.trim()) {
      setIsCommentTextEmpty(true);
      setCommentText('');

      return;
    }

    const newComment = {
      postId: selectedPostId,
      name: commentAuthor,
      email: commentAuthorsEmail,
      body: commentText,
    };

    setIsCommentAdding(true);
    createComment(newComment)
      .then(res => onAddComment(res))
      .catch(() => onAddComment(null))
      .finally(() => setIsCommentAdding(false));

    setCommentText('');
  };

  const handleCommentAuthorChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCommentAuthor(e.target.value);
    setisAuthorNameEmpty(false);
  };

  const handleCommentAuthorsEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCommentAuthorsEmail(e.target.value);
    setIsAuthorsEmailEmpty(false);
  };

  const handleCommentTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCommentText(e.target.value);
    setIsCommentTextEmpty(false);
  };

  const handleFormReset = () => {
    setCommentAuthor('');
    setCommentAuthorsEmail('');
    setCommentText('');
    setisAuthorNameEmpty(false);
    setIsAuthorsEmailEmpty(false);
    setIsCommentTextEmpty(false);
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
            className={classNames(
              'input',
              { 'is-danger': isCommentAuthorsNameEmpty },
            )}
            value={commentAuthor}
            onChange={handleCommentAuthorChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isCommentAuthorsNameEmpty && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isCommentAuthorsNameEmpty && (
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
              { 'is-danger': isAuthorsEmailEmpty },
            )}
            value={commentAuthorsEmail}
            onChange={handleCommentAuthorsEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isAuthorsEmailEmpty && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isAuthorsEmailEmpty && (
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
              { 'is-danger': isCommentTextEmpty },
            )}
            value={commentText}
            onChange={handleCommentTextChange}
          />
        </div>

        {isCommentTextEmpty && (
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
              { 'is-loading': isCommentAdding },
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
            onClick={handleFormReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
