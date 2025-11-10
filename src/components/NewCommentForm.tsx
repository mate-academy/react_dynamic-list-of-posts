import React, { useState } from 'react';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

type Props = {
  postId: number;
  onAddComment: (comment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, onAddComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorBody, setErrorBody] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedBody = body.trim();

    const hasError =
      trimmedName === '' || trimmedEmail === '' || trimmedBody === '';

    setErrorName(trimmedName === '');
    setErrorEmail(trimmedEmail === '');
    setErrorBody(trimmedBody === '');

    if (hasError) {
      return;
    }

    setSubmitting(true);

    try {
      const savedComment = await client.post<Comment>('/comments', {
        postId,
        name: trimmedName,
        email: trimmedEmail,
        body: trimmedBody,
      });

      onAddComment(savedComment);
      setBody(''); // тільки очищаємо тіло коментаря
    } catch {
      alert('Something went wrong!');
    } finally {
      setSubmitting(false);
    }
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (errorName && value.trim() !== '') {
      setErrorName(false);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (errorEmail && value.trim() !== '') {
      setErrorEmail(false);
    }
  };

  const handleBodyChange = (value: string) => {
    setBody(value);
    if (errorBody && value.trim() !== '') {
      setErrorBody(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setBody('');
    setErrorName(false);
    setErrorEmail(false);
    setErrorBody(false);
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
            name={name}
            id="comment-author-name"
            placeholder="Name Surname"
            className={`input ${errorName ? 'is-danger' : ''}`}
            onChange={e => handleNameChange(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errorName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorName && (
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
            name={email}
            id="comment-author-email"
            placeholder="email@test.com"
            className={`input ${errorEmail ? 'is-danger' : ''}`}
            onChange={e => handleEmailChange(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errorEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorEmail && (
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
            value={body}
            className={`textarea ${errorBody ? 'is-danger' : ''}`}
            onChange={e => handleBodyChange(e.target.value)}
          />
        </div>

        {errorBody && (
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
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
