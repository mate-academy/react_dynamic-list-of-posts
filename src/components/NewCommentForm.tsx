import React, { useState } from 'react';
import { PostComment } from '../types/PostComment';

interface Props {
  postId: number;
  addNewComment: (comment: Omit<PostComment, 'id'>) => Promise<void>;
}

export const NewCommentForm: React.FC<Props> = ({ postId, addNewComment }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [commentText, setCommentText] = useState('');

  const [hasUsernameError, setHasUsernameError] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasCommentTextError, setHasCommentTextError] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReset = () => {
    setUsername('');
    setEmail('');
    setCommentText('');

    setHasUsernameError(false);
    setHasEmailError(false);
    setHasCommentTextError(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const isUsernameInvalid = !username.trim();
    const isEmailInvalid = !email.trim();
    const isCommentInvalid = !commentText.trim();

    setHasUsernameError(isUsernameInvalid);
    setHasEmailError(isEmailInvalid);
    setHasCommentTextError(isCommentInvalid);

    if (isUsernameInvalid || isEmailInvalid || isCommentInvalid) {
      return;
    }

    const newComment = {
      postId,
      name: username.trim(),
      email: email.trim(),
      body: commentText.trim(),
    };

    setIsSubmitting(true);
    addNewComment(newComment)
      .then(() => {
        setCommentText('');
      })
      .catch(() => {})
      .finally(() => setIsSubmitting(false));
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

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            value={username}
            onChange={e => {
              setUsername(e.target.value);
              setHasUsernameError(false);
            }}
            placeholder="Name Surname"
            className={'input' + (hasUsernameError ? ' is-danger' : '')}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasUsernameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {hasUsernameError && (
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
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setHasEmailError(false);
            }}
            placeholder="email@test.com"
            className={'input' + (hasEmailError ? ' is-danger' : '')}
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
            className={'textarea' + (hasCommentTextError ? ' is-danger' : '')}
            value={commentText}
            onChange={e => {
              setCommentText(e.target.value);
              setHasCommentTextError(false);
            }}
          />
        </div>

        {hasCommentTextError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={'button is-link' + (isSubmitting ? ' is-loading' : '')}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
