import React, { FormEvent, useState } from 'react';
import cn from 'classnames';

import { Comment } from '../types';

type Props = {
  selectedPostId: number;
  onAddComment: (newComment: Omit<Comment, 'id'>) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  onAddComment,
}) => {
  const [name, setName] = useState('');
  const [hasName, setHasName] = useState(true);
  const [email, setEmail] = useState('');
  const [hasEmail, setHasEmail] = useState(true);
  const [commentBody, setCommentBody] = useState('');
  const [hasCommentBody, setHasCommentBody] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!name) {
      setHasName(false);
    }

    if (!email) {
      setHasEmail(false);
    }

    if (!commentBody) {
      setHasCommentBody(false);
    }

    if (!name || !email || !commentBody) {
      return;
    }

    setIsLoading(true);

    const newComment = {
      postId: selectedPostId,
      name: name.trim(),
      email: email.trim(),
      body: commentBody.trim(),
    };

    onAddComment(newComment)
      .then(() => setCommentBody(''))
      .finally(() => setIsLoading(false));
  };

  const handleChangeName = (authorName: string) => {
    setName(authorName);
    setHasName(true);
  };

  const handleChangeEmail = (authorEmail: string) => {
    setEmail(authorEmail);
    setHasEmail(true);
  };

  const handleChangeComment = (comment: string) => {
    setCommentBody(comment);
    setHasCommentBody(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setCommentBody('');

    setHasName(true);
    setHasEmail(true);
    setHasCommentBody(true);
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
            className={cn('input', { 'is-danger': !hasName })}
            value={name}
            onChange={event => handleChangeName(event.target.value.trimStart())}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!hasName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!hasName && (
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
            className={cn('input', { 'is-danger': !hasEmail })}
            value={email}
            onChange={event =>
              handleChangeEmail(event.target.value.trimStart())
            }
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {!hasEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!hasEmail && (
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
            className={cn('textarea', { 'is-danger': !hasCommentBody })}
            value={commentBody}
            onChange={event =>
              handleChangeComment(event.target.value.trimStart())
            }
          />
        </div>

        {!hasCommentBody && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', { 'is-loading': isLoading })}
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
