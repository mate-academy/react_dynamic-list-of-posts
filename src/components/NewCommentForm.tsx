import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';

type Props = {
  isSubmittingForm: boolean;
  setIsSubmittingForm: (isSubmit: boolean) => void;
  handleCommentFormSubmit: (
    postId: Post['id'],
    authorName: string,
    authorEmail: string,
    commentBody: string,
  ) => void;
  currentPostId: number;
};

export const NewCommentForm: React.FC<Props> = ({
  isSubmittingForm,
  setIsSubmittingForm,
  handleCommentFormSubmit,
  currentPostId,
}) => {
  const [authorName, setAuthorName] = useState<string>('');
  const [authorEmail, setAuthorEmail] = useState<string>('');
  const [commentBody, setCommentBody] = useState<string>('');

  const [authorNameError, setAuthorNameError] = useState<boolean>(false);
  const [authorEmailError, setAuthorEmailError] = useState<boolean>(false);
  const [commentBodyError, setCommentBodyError] = useState<boolean>(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorEmail(event.target.value);
  };

  const handleCommentBodyChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCommentBody(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let errors = 0;

    handleCommentFormSubmit(
      currentPostId,
      authorName,
      authorEmail,
      commentBody,
    );

    if (!authorName.trim().length) {
      setAuthorNameError(true);
      errors++;
    }

    if (!authorEmail.trim().length) {
      setAuthorEmailError(true);
      errors++;
    }

    if (!commentBody.trim().length) {
      setCommentBodyError(true);
      errors++;
    }

    if (!errors) {
      setCommentBody('');
    }

    setIsSubmittingForm(false);
  };

  const handleClear = () => {
    setAuthorName('');
    setAuthorEmail('');
    setCommentBody('');

    setAuthorNameError(false);
    setAuthorEmailError(false);
    setCommentBodyError(false);
  };

  useEffect(() => {
    setAuthorNameError(false);
  }, [authorName]);

  useEffect(() => {
    setAuthorEmailError(false);
  }, [authorEmail]);

  useEffect(() => {
    setCommentBodyError(false);
  }, [commentBody]);

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
            className={classNames('input', { 'is-danger': authorNameError })}
            value={authorName}
            onChange={handleNameChange}
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
            className={classNames('input', { 'is-danger': authorEmailError })}
            value={authorEmail}
            onChange={handleEmailChange}
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
            className={classNames('textarea', {
              'is-danger': commentBodyError,
            })}
            value={commentBody}
            onChange={handleCommentBodyChange}
          />
        </div>

        {commentBodyError && (
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
              'is-loading': isSubmittingForm,
            })}
            onClick={() => setIsSubmittingForm(true)}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
