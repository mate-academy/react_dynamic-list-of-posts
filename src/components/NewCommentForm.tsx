import React, { FormEvent, useCallback, useState } from 'react';
import cn from 'classnames';

type Props = {
  handleAddComment: (
    name: string,
    email: string,
    comment: string,
  ) => void
};

export const NewCommentForm: React.FC<Props> = ({ handleAddComment }) => {
  const [authorName, setAuthorName] = useState('');
  const [authorNameError, setAuthorNameError] = useState(false);
  const [authorEmail, setAuthorEmail] = useState('');
  const [authorEmailError, setAuthorEmailError] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentTextError, setCommentTextError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const authorNameHandler = useCallback((event) => {
    setAuthorName(event.target.value);
    setAuthorNameError(false);
  }, [authorName]);

  const authorEmailHandler = useCallback((event) => {
    setAuthorEmail(event.target.value);
    setAuthorEmailError(false);
  }, [authorEmail]);

  const commentTextHandler = useCallback((event) => {
    setCommentText(event.target.value);
    setCommentTextError(false);
  }, [commentText]);

  const addCommentHandler = useCallback((event: FormEvent) => {
    event.preventDefault();

    setAuthorNameError(authorName.length === 0);
    setAuthorEmailError(authorEmail.length === 0);
    setCommentTextError(commentText.length === 0);

    if (authorName.length === 0
        || authorEmail.length === 0
        || commentText.length === 0) {
      return;
    }

    setIsLoading(true);
    handleAddComment(authorName, authorEmail, commentText);
    setIsLoading(false);

    setCommentText('');
  }, [authorName, authorEmail, commentText]);

  const clearForm = useCallback(() => {
    setAuthorName('');
    setAuthorEmail('');
    setCommentText('');

    setAuthorNameError(false);
    setAuthorEmailError(false);
    setCommentTextError(false);
  }, []);

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={addCommentHandler}
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
            className={cn(
              'input',
              { 'is-danger': authorNameError },
            )}
            value={authorName}
            onChange={(event) => authorNameHandler(event)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {authorNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {authorNameError && (
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
            className={cn(
              'input',
              { 'is-danger': authorEmailError },
            )}
            value={authorEmail}
            onChange={(event) => authorEmailHandler(event)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {authorEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {authorEmailError && (
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
            className={cn(
              'textarea',
              { 'is-danger': commentTextError },
            )}
            value={commentText}
            onChange={(event) => commentTextHandler(event)}
          />
        </div>

        {commentTextError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            // className="button is-link is-loading"
            className={cn(
              'button',
              'is-link',
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
            onClick={clearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
