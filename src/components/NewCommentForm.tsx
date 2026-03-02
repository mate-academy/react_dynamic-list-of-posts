import React, { useState } from 'react';
import { CommentData } from '../types/Comment';

type Props = {
  initialName?: string;
  initialEmail?: string;
  submitting?: boolean;
  onSubmit: (data: CommentData) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  initialName = '',
  initialEmail = '',
  submitting = false,
  onSubmit,
}) => {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [body, setBody] = useState('');
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    body: false,
  });

  const hasError = {
    name: touched.name && name.trim() === '',
    email: touched.email && email.trim() === '',
    body: touched.body && body.trim() === '',
  };

  const handleSubmit: React.FormEventHandler = e => {
    e.preventDefault();

    setTouched({ name: true, email: true, body: true });

    if (name.trim() === '' || email.trim() === '' || body.trim() === '') {
      return;
    }

    onSubmit({ name: name.trim(), email: email.trim(), body: body.trim() });

    // Clear body and reset validation state so errors are not shown after successful submit
    setBody('');
    setTouched({ name: false, email: false, body: false });
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setBody('');
    setTouched({ name: false, email: false, body: false });
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className={`control has-icons-left has-icons-right`}>
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={`input ${hasError.name ? 'is-danger' : ''}`}
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasError.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasError.name && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className={`control has-icons-left has-icons-right`}>
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={`input ${hasError.email ? 'is-danger' : ''}`}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasError.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasError.email && (
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
            className={`textarea ${hasError.body ? 'is-danger' : ''}`}
            value={body}
            onChange={e => setBody(e.target.value)}
          />
        </div>

        {hasError.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={`button is-link ${submitting ? 'is-loading' : ''}`}
            data-cy="SubmitCommentButton"
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            data-cy="ResetCommentButton"
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
