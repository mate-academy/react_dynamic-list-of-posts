import React, { useState } from 'react';
import cn from 'classnames';
import { addNewComment } from '../services/comment';
import { Comment } from '../types/Comment';

type NewCommentFormProps = {
  postId: number;
  onAddNewComment: (newComment: Comment) => void;
};

export const NewCommentForm: React.FC<NewCommentFormProps> = ({
  postId,
  onAddNewComment,
}) => {
  const [authorName, setAuthorName] = useState('');
  const [hasNameAuthorError, setHasNameAuthorError] = useState(false);

  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);

  const [comment, setComment] = useState('');
  const [hasCommentError, setHasCommentError] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleAuthorNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorName(e.target.value);
    setHasNameAuthorError(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setHasEmailError(false);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    setHasCommentError(false);
  };

  const handleReset = () => {
    setAuthorName('');
    setEmail('');
    setComment('');
    setHasNameAuthorError(false);
    setHasEmailError(false);
    setHasCommentError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const trimmedAuthorName = authorName.trim();
    const trimmedEmail = email.trim();
    const trimmedComment = comment.trim();

    setHasNameAuthorError(!trimmedAuthorName);
    setHasEmailError(!trimmedEmail);
    setHasCommentError(!trimmedComment);

    if (!trimmedAuthorName || !trimmedEmail || !trimmedComment) {
      setLoading(false);

      return;
    }

    const newComment = {
      postId: postId,
      name: trimmedAuthorName,
      email: trimmedEmail,
      body: trimmedComment,
    };

    addNewComment(newComment)
      .then(c => {
        onAddNewComment(c);
        setComment('');
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit} autoComplete="false">
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
            className={cn('input', { 'is-danger': hasNameAuthorError })}
            value={authorName}
            onChange={handleAuthorNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasNameAuthorError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasNameAuthorError && (
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
            className={cn('input', { 'is-danger': hasEmailError })}
            onChange={handleEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasEmailError && (
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
            className={cn('textarea', { 'is-danger': hasCommentError })}
            value={comment}
            onChange={handleCommentChange}
          />
        </div>

        {hasCommentError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', { 'is-loading': loading })}
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
