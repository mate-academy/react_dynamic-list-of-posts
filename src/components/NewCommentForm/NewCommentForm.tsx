import React, { useState } from 'react';
import cn from 'classnames';
import { addComment } from '../../api/requests';
import { Comment } from '../../types/Comment';

type Props = {
  postId: number,
  handleAddComment: (comment: Comment) => void,
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  handleAddComment,
}) => {
  const [nameQuery, setNameQuery] = useState('');
  const [emailQuery, setEmailQuery] = useState('');
  const [bodyQuery, setBodyQuery] = useState('');
  const [nameHasError, setNameHasError] = useState(false);
  const [emailHasError, setEmailHasError] = useState(false);
  const [bodyHasError, setBodyHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClearInputs = () => {
    setNameQuery('');
    setNameHasError(false);
    setEmailQuery('');
    setEmailHasError(false);
    setBodyQuery('');
    setBodyHasError(false);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameHasError(false);
    setNameQuery(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailHasError(false);
    setEmailQuery(e.target.value);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBodyHasError(false);
    setBodyQuery(e.target.value);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasError = false;

    if (!nameQuery.trim()) {
      setNameHasError(true);
      hasError = true;
    }

    if (!emailQuery.trim()) {
      setEmailHasError(true);
      hasError = true;
    }

    if (!bodyQuery.trim()) {
      setBodyHasError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setIsLoading(true);

    const newComment = {
      postId,
      name: nameQuery,
      email: emailQuery,
      body: bodyQuery,
    };

    addComment(newComment)
      .then(response => {
        handleAddComment(response);
        setBodyQuery('');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={(event) => handleOnSubmit(event)}>
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
              {
                'is-danger': nameHasError,
              },
            )}
            value={nameQuery}
            onChange={(event) => handleNameChange(event)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameHasError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameHasError && (
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
              {
                'is-danger': emailHasError,
              },
            )}
            value={emailQuery}
            onChange={(event) => handleEmailChange(event)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailHasError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailHasError && (
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
              {
                'is-danger': bodyHasError,
              },
            )}
            value={bodyQuery}
            onChange={(event) => handleBodyChange(event)}
          />
        </div>

        {bodyHasError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn(
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
            onClick={handleClearInputs}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
