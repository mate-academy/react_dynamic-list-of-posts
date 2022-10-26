import React, { useState, FormEvent } from 'react';
import classNames from 'classnames';
import { createComment } from '../../api/comments';
import { Error } from '../../types/Error';

type Props = {
  postId: number | null;
  onAdd: (comment: {}) => void;
  onError: (error: Error | null) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  onAdd,
  onError,
}) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleCreateComment = async () => {
    try {
      setIsLoading(true);
      onError(null);

      if (!postId) {
        return;
      }

      const newComment = await createComment({
        postId,
        name,
        email,
        body,
      });

      onAdd(newComment);
      setName(newComment.name);
      setEmail(newComment.email);
    } catch {
      onError(Error.ADD_COMMENT);
    } finally {
      setIsLoading(false);
      setIsSubmitted(false);
      setBody('');
    }
  };

  const handleFormValidation = () => {
    setIsSubmitted(true);

    return (!name || !email || !body)
      ? setIsValid(false)
      : setIsValid(true);
  };

  const handleClearForm = () => {
    setName('');
    setEmail('');
    setBody('');
    onError(null);
    setIsSubmitted(false);
  };

  const handleNotification = (length: number) => {
    return isSubmitted && !length;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    handleCreateComment();
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={(event) => handleSubmit(event)}
    >
      <div
        className="field"
        data-cy="NameField"
      >
        <label
          className="label"
          htmlFor="comment-author-name"
        >
          Author Name
        </label>

        <div
          className="
            control
            has-icons-left
            has-icons-right"
        >
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames(
              'input',
              { 'is-danger': handleNotification(name.length) },
            )}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <span
            className="
              icon
              is-small
              is-left"
          >
            <i className="fas fa-user" />
          </span>

          {handleNotification(name.length) && (
            <span
              className="icon
                is-small
                is-right
                has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {handleNotification(name.length) && (
          <p
            className="help is-danger"
            data-cy="ErrorMessage"
          >
            Name is required
          </p>
        )}
      </div>

      <div
        className="field"
        data-cy="EmailField"
      >
        <label
          className="label"
          htmlFor="comment-author-email"
        >
          Author Email
        </label>

        <div
          className="
            control
            has-icons-left
            has-icons-right"
        >
          <input
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames(
              'input',
              { 'is-danger': handleNotification(email.length) },
            )}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <span
            className="
              icon
              is-small
              is-left"
          >
            <i className="fas fa-envelope" />
          </span>

          {handleNotification(email.length) && (
            <span
              className="icon
                is-small
                is-right
                has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {handleNotification(email.length) && (
          <p
            className="help is-danger"
            data-cy="ErrorMessage"
          >
            Email is required
          </p>
        )}
      </div>

      <div
        className="field"
        data-cy="BodyField"
      >
        <label
          className="label"
          htmlFor="comment-body"
        >
          Comment Text
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames(
              'textarea',
              { 'is-danger': handleNotification(body.length) },
            )}
            value={body}
            onChange={(event) => setBody(event.target.value)}
          />
        </div>

        {handleNotification(body.length) && (
          <p
            className="help is-danger"
            data-cy="ErrorMessage"
          >
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
              { 'is-loading': isLoading },
            )}
            onClick={() => handleFormValidation()}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="
              button
              is-link
              is-light"
            aria-label="resetButton"
            onClick={() => handleClearForm()}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
