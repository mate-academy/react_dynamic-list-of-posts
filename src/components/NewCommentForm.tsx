import React, { FormEvent, useState } from 'react';
import { Comment, NewComment } from '../types/Comment';

type Errors = {
  name: boolean;
  email: boolean;
  body: boolean;
};

type Props = {
  postId: number;
  onAdd: (comment: NewComment) => Promise<Comment>;
};

const emptyErrors: Errors = {
  name: false,
  email: false,
  body: false,
};

export const NewCommentForm: React.FC<Props> = ({ postId, onAdd }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const [errors, setErrors] = useState<Errors>(emptyErrors);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [hasAddingError, setHasAddingError] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedBody = body.trim();

    const newErrors: Errors = {
      name: !trimmedName,
      email: !trimmedEmail,
      body: !trimmedBody,
    };

    setErrors(newErrors);
    setHasAddingError(false);

    if (newErrors.name || newErrors.email || newErrors.body) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onAdd({
        postId,
        name: trimmedName,
        email: trimmedEmail,
        body: trimmedBody,
      });

      setName(trimmedName);
      setEmail(trimmedEmail);

      setBody('');
      setErrors(emptyErrors);
    } catch {
      setHasAddingError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setBody('');
    setErrors(emptyErrors);
    setHasAddingError(false);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={handleClear}
    >
      {hasAddingError && (
        <div className="notification is-danger">Unable to add a comment</div>
      )}

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
            className={['input', errors.name ? 'is-danger' : '']
              .filter(Boolean)
              .join(' ')}
            value={name}
            onChange={event => {
              setName(event.target.value);

              setErrors(current => ({
                ...current,
                name: false,
              }));

              setHasAddingError(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.name && (
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
            className={['input', errors.email ? 'is-danger' : '']
              .filter(Boolean)
              .join(' ')}
            value={email}
            onChange={event => {
              setEmail(event.target.value);

              setErrors(current => ({
                ...current,
                email: false,
              }));

              setHasAddingError(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.email && (
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
            className={['textarea', errors.body ? 'is-danger' : '']
              .filter(Boolean)
              .join(' ')}
            value={body}
            onChange={event => {
              setBody(event.target.value);

              setErrors(current => ({
                ...current,
                body: false,
              }));

              setHasAddingError(false);
            }}
          />
        </div>

        {errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={['button', 'is-link', isSubmitting ? 'is-loading' : '']
              .filter(Boolean)
              .join(' ')}
            disabled={isSubmitting}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            disabled={isSubmitting}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
