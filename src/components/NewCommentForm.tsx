import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { addComment } from '../api/posts';
import { PostContext } from '../PostProvider';
import { CommentData } from '../types/Comment';

export const NewCommentForm: React.FC = () => {
  const { setComments, selectedPost } = useContext(PostContext);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isSubmitError, setIsSubmitError] = useState(false);
  const [isNameError, setIsNameError] = useState<boolean>(false);
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [isBodyError, setIsBodyError] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      setIsNameError(true);
    }

    if (!email.trim()) {
      setIsEmailError(true);
    }

    if (!body.trim()) {
      setIsBodyError(true);
    }

    const isValidated = !!name.trim() && !!email.trim() && !!body.trim();

    if (!!selectedPost && isValidated) {
      setIsSubmitting(true);

      const newComment: CommentData = {
        postId: selectedPost.id,
        name,
        email,
        body,
      };

      addComment(newComment)
        .then(addedComment => {
          setComments(currComments => [...currComments, addedComment]);
          setBody('');
        })
        .catch(() => {
          setIsSubmitError(true);
        })
        .finally(() => setIsSubmitting(false));
    }
  };

  const reset = () => {
    setName('');
    setEmail('');
    setBody('');
    setIsNameError(false);
    setIsEmailError(false);
    setIsBodyError(false);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setIsNameError(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsEmailError(false);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
    setIsBodyError(false);
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
              'is-danger': isNameError,
            })}
            value={name}
            onChange={handleNameChange}
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
            className={classNames('input', {
              'is-danger': isEmailError,
            })}
            value={email}
            onChange={handleEmailChange}
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
            className={classNames('textarea', {
              'is-danger': isBodyError,
            })}
            value={body}
            onChange={handleBodyChange}
          />
        </div>

        {isBodyError && (
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
              'is-loading': isSubmitting,
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

      {isSubmitError && (
        <div className="notification is-danger">
          Couldn&apos;t post this comment.
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            onClick={() => setIsSubmitError(false)}
          />
        </div>
      )}
    </form>
  );
};
