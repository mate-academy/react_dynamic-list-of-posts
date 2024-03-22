import React, { useState } from 'react';
import cn from 'classnames';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  addComment: ({
    postId,
    name,
    email,
    body,
  }: Omit<Comment, 'id'>) => Promise<void>;
  selectedPost: Post | null;
};

export const NewCommentForm: React.FC<Props> = ({
  addComment,
  selectedPost,
}) => {
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [authorText, setAuthorText] = useState('');
  const [authorNameError, setAuthorNameError] = useState(false);
  const [authorEmailError, setAuthorEmailError] = useState(false);
  const [authorTextError, setAuthorTextError] = useState(false);
  const [addButtonIsloading, setAddButtonIsloading] = useState(false);

  let selectedPostId: number;

  if (selectedPost) {
    selectedPostId = selectedPost.id;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthorNameError(false);
    setAuthorEmailError(false);
    setAuthorTextError(false);

    if (!authorName.trim() || !authorEmail.trim() || !authorText.trim()) {
      setAuthorNameError(!authorName.trim());
      setAuthorEmailError(!authorEmail.trim());
      setAuthorTextError(!authorText.trim());

      return;
    }

    setAddButtonIsloading(true);

    addComment({
      postId: selectedPostId,
      name: authorName.trim(),
      email: authorEmail.trim(),
      body: authorText.trim(),
    })
      .catch(error => {
        setAuthorNameError(true);
        setAuthorEmailError(true);
        setAuthorTextError(true);
        throw error;
      })
      .finally(() => setAddButtonIsloading(false));

    setAuthorText('');
  };

  const handleClear = () => {
    setAuthorName('');
    setAuthorEmail('');
    setAuthorText('');
    setAuthorNameError(false);
    setAuthorEmailError(false);
    setAuthorTextError(false);
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
            value={authorName}
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', {
              'is-danger': authorNameError,
            })}
            onChange={event => setAuthorName(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {authorNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {authorNameError && (
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
            value={authorEmail}
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', {
              'is-danger': authorEmailError,
            })}
            onChange={event => setAuthorEmail(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {authorEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {authorEmailError && (
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
            value={authorText}
            placeholder="Type comment here"
            className={cn('textarea', {
              'is-danger': authorTextError,
            })}
            onChange={event => setAuthorText(event.target.value)}
          />
        </div>

        {authorTextError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', {
              'is-loading': addButtonIsloading,
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
