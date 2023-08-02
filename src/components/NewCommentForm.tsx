import React, { useState } from 'react';
import classNames from 'classnames';

import * as postService from '../api/posts';
import { Comment } from '../types/Comment';

type Props = {
  onAddComment: (comment: Comment) => void,
  postId: number,
};

export const NewCommentForm: React.FC<Props> = ({ onAddComment, postId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleClear = () => {
    setError(false);
    setBody('');
  };

  const addComment = () => {
    if ((!name.trim()) || (!email.trim()) || (!body.trim())) {
      setError(true);

      return;
    }

    setIsLoading(true);

    const newComment = {
      postId,
      name: name.trim(),
      email: email.trim(),
      body: body.trim(),
    };

    postService.addComment(newComment)
      .then(onAddComment)
      .then(() => handleClear())
      .catch((commentError) => {
        throw commentError;
      })
      .finally(() => setIsLoading(false));
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addComment();
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmitForm}>
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
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={classNames('input', {
              'is-danger': (error && !name.trim()),
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {(error && !name.trim()) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {(error && !name.trim()) && (
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
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={classNames('input', {
              'is-danger': (error && !email.trim()),
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {(error && !email.trim()) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {(error && !email.trim()) && (
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
            onChange={(event) => setBody(event.target.value)}
            className={classNames('textarea', {
              'is-danger': (error && !body.trim() && !isLoading),
            })}
          />
        </div>

        {(error && !body.trim() && !isLoading) && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': isLoading,
            })}
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
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
