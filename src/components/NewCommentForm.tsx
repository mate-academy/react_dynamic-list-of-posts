import React, { useState } from 'react';
import { createNewComment } from './api/users';
import { Comment } from '../types/Comment';

interface NewCommentFormProps {
  postId: number;
  onCommentAdded: (newComment: Comment) => void;
}

export const NewCommentForm: React.FC<NewCommentFormProps> = ({
  postId,
  onCommentAdded,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setError('');
    if (!name.trim()) {
      setError('Имя обязательно');

      return;
    }

    if (!email.trim()) {
      setError('Email обязателен');

      return;
    }

    if (!body.trim()) {
      setError('Введите текст комментария');

      return;
    }

    try {
      setIsLoading(true);
      const newComment = await createNewComment(postId, name, email, body);

      onCommentAdded(newComment);
      setName(name);
      setEmail(email);
      setBody('');
      setError('');
      setIsSubmitted(false);
    } catch (err) {
      setError('Failed to add comment');
    } finally {
      setIsLoading(false);
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
            className={`input ${!name && isSubmitted ? 'is-danger' : ''}`}
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {!name && isSubmitted ? (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          ) : null}
        </div>
        {!name && isSubmitted ? (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        ) : null}
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
            className={`input ${!email && isSubmitted ? 'is-danger' : ''}`}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {!email && isSubmitted ? (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          ) : null}
        </div>
        {!email && isSubmitted ? (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        ) : null}
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
            className={`textarea ${!body && isSubmitted ? 'is-danger' : ''}`}
            value={body}
            onChange={e => setBody(e.target.value)}
          />
        </div>
        {!body && isSubmitted ? (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        ) : null}
      </div>

      {error && (
        <p className="help is-danger" data-cy="ErrorMessage">
          {error}
        </p>
      )}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={`button is-link ${isLoading ? 'is-loading' : null}`}
          >
            Add
          </button>
        </div>
        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            onClick={() => {
              setName('');
              setEmail('');
              setBody('');
              setError('');
              setIsSubmitted(false);
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
