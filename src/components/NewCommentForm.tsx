import React, { useState } from 'react';
import cn from 'classnames';

type Props = {
  selectedPostId: number;
  handleAddNewComment: (
    postId: number,
    name: string,
    email: string,
    body: string,
  ) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  handleAddNewComment,
}) => {
  const [name, setName] = useState('');
  const [isNameError, setIsNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isCommentTextError, setIsCommentTextError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleClear = () => {
    setName('');
    setIsNameError(false);
    setEmail('');
    setIsEmailError(false);
    setCommentText('');
    setIsCommentTextError(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim().length) {
      setIsNameError(true);
    } else {
      setIsNameError(false);
    }

    if (!email.trim().length) {
      setIsEmailError(true);
    } else {
      setIsEmailError(false);
    }

    if (!commentText.length) {
      setIsCommentTextError(true);
    } else {
      setIsCommentTextError(false);
    }

    if (name.trim().length
      && email.trim().length
      && commentText.trim().length
    ) {
      try {
        setIsLoading(true);

        await handleAddNewComment(selectedPostId, name, email, commentText);
        setCommentText('');
      } catch {
        throw new Error();
      } finally {
        setIsLoading(false);
      }
    }
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
            className={cn('input', {
              'is-danger': isNameError,
            })}
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', {
              'is-danger': isEmailError,
            })}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            className={cn('textarea', {
              'is-danger': isCommentTextError,
            })}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
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
            className={cn('button', 'is-link', {
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
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
