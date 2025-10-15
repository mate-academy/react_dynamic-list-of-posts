import React, { useMemo, useState } from 'react';
import { Comment, CommentData } from '../types/Comment';
import { createComment } from '../utils/api';

type FormErrors = Partial<Record<keyof CommentData, string>>;

type Props = {
  postId: number;
  onSubmitted: (comment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, onSubmitted }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [wasSubmitted, setWasSubmitted] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const errors = useMemo<FormErrors>(() => {
    const e: FormErrors = {};

    if (!name.trim()) {
      e.name = 'Name is required';
    }

    if (!email.trim()) {
      e.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      e.email = 'Invalid email';
    }

    if (!body.trim()) {
      e.body = 'Comment text is required';
    }

    return e;
  }, [name, email, body]);

  const hasErrors = Object.keys(errors).length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setWasSubmitted(true);

    if (hasErrors) {
      return;
    }

    try {
      setSubmitting(true);
      const created = await createComment({
        postId,
        name: name.trim(),
        email: email.trim(),
        body: body.trim(),
      });

      onSubmitted(created);
      setBody('');
      setWasSubmitted(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setBody('');
    setWasSubmitted(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            className={`input ${wasSubmitted && errors.name ? 'is-danger' : ''}`}
            type="text"
            name="name"
            value={name}
            id="comment-author-name"
            placeholder="Name Surname"
            onChange={e => {
              setName(e.target.value);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {wasSubmitted && errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {wasSubmitted && errors.name && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.name}
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
            className={`input ${wasSubmitted && errors.email ? 'is-danger' : ''}`}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {wasSubmitted && errors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {wasSubmitted && errors.email && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.email}
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
            className={`textarea ${wasSubmitted && errors.body ? 'is-danger' : ''}`}
            rows={4}
            value={body}
            onChange={e => setBody(e.target.value)}
          />
        </div>

        {wasSubmitted && errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.body}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={`button is-link ${submitting ? 'is-loading' : ''}`}
            disabled={submitting}
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
            disabled={submitting}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
