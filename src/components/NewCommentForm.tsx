import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import { CommentFormError } from '../types/CommentFromError';
import classNames from 'classnames';
import { client } from '../utils/fetchClient';

type Props = {
  postId: number;
  onCommentAdded: (newComment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, onCommentAdded }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', body: '' });
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const validate = () => {
    const newErrors = { name: '', email: '', body: '' };

    if (!name.trim()) {
      newErrors.name = CommentFormError.NameRequired;
    }

    if (!email.trim()) {
      newErrors.email = CommentFormError.EmailRequired;
    }

    if (!body.trim()) {
      newErrors.body = CommentFormError.TextRequired;
    }

    setErrors(newErrors);

    return !newErrors.name && !newErrors.email && !newErrors.body;
  };

  const reset = () => {
    setName('');
    setEmail('');
    setBody('');
    setErrors({ name: '', email: '', body: '' });
    setHasSubmitted(false);
  };

  const resetAfterSubmit = () => {
    setBody('');
    setErrors({ name: '', email: '', body: '' });
    setHasSubmitted(false);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={async e => {
        e.preventDefault();
        setError(false);
        setHasSubmitted(true);
        const isValid = validate();

        if (isValid) {
          try {
            setIsLoading(true);
            const postData = await client.post<Comment>('/comments', {
              name: name.trim(),
              email: email.trim(),
              body: body.trim(),
              postId,
            });

            onCommentAdded(postData);
            resetAfterSubmit();
          } catch {
            setError(true);
          } finally {
            setIsLoading(false);
          }
        }
      }}
      onReset={() => reset()}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div
          className={classNames('control', 'has-icons-left', {
            'has-icons-right': hasSubmitted && errors.name,
          })}
        >
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': hasSubmitted && errors.name,
            })}
            value={name}
            onChange={e => {
              setName(e.target.value);
              setErrors(current => ({ ...current, name: '' }));
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasSubmitted && errors.name && (
            <>
              {' '}
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            </>
          )}
        </div>

        {hasSubmitted && errors.name && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {CommentFormError.NameRequired}
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div
          className={classNames('control', 'has-icons-left', {
            'has-icons-right': hasSubmitted && errors.email,
          })}
        >
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': hasSubmitted && errors.email,
            })}
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setErrors(current => ({ ...current, email: '' }));
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasSubmitted && errors.email && (
            <>
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            </>
          )}
        </div>

        {hasSubmitted && errors.email && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {CommentFormError.EmailRequired}
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
              'is-danger': hasSubmitted && errors.body,
            })}
            value={body}
            onChange={e => {
              setBody(e.target.value);
              setErrors(current => ({ ...current, body: '' }));
            }}
          />
        </div>

        {hasSubmitted && errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {CommentFormError.TextRequired}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
              'is-loading': isLoading,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>

      {error && (
        <div className="notification is-danger" data-cy="ErrorMessage">
          Something went wrong. Please try again.
        </div>
      )}
    </form>
  );
};
