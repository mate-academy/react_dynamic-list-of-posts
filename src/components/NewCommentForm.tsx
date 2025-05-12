import React, { useState } from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  currentPost: Post;
  createComment: (comment: Comment) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({
  currentPost,
  createComment,
}) => {
  const [queryName, setQueryName] = useState('');
  const [queryEmail, setQueryEmail] = useState('');
  const [queryText, setQueryText] = useState('');

  const [queryNameError, setQueryNameError] = useState(false);
  const [queryEmailError, setQueryEmailError] = useState(false);
  const [queryTextError, setQueryTextError] = useState(false);

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const reset = () => {
    setQueryName('');
    setQueryEmail('');
    setQueryText('');
    setQueryNameError(false);
    setQueryEmailError(false);
    setQueryTextError(false);
  };

  const handleQueryName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryNameError(false);
    const tempQueryName = event.target.value.trim();

    setQueryName(tempQueryName);
  };

  const handleQueryEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryEmailError(false);
    const tempQueryEmail = event.target.value.trim();

    setQueryEmail(tempQueryEmail);
  };

  const handleQueryText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQueryTextError(false);
    const tempQueryText = event.target.value.trim();

    setQueryText(tempQueryText);
  };

  const hanldeSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitLoading(true);

    setQueryNameError(!queryName);
    setQueryEmailError(!queryEmail);
    setQueryTextError(!queryText);

    if (!queryName || !queryEmail || !queryText) {
      setIsSubmitLoading(false);

      return;
    }

    createComment({
      id: 0,
      postId: currentPost.id,
      name: queryName,
      email: queryEmail,
      body: queryText,
    })
      .then(() => {
        reset();
      })
      .catch(() => {})
      .finally(() => {
        setIsSubmitLoading(false);
      });
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={hanldeSubmit}>
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
            className={`input ${queryNameError ? 'is-danger' : ''}`}
            value={queryName}
            onChange={handleQueryName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {queryNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {queryNameError && (
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
            className={`input ${queryEmailError ? 'is-danger' : ''}`}
            onChange={handleQueryEmail}
            value={queryEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {queryEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {queryEmailError && (
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
            className={`textarea ${queryTextError ? 'is-danger' : ''}`}
            onChange={handleQueryText}
            value={queryText}
          />
        </div>

        {queryTextError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={`button is-link ${isSubmitLoading ? 'is-loading' : ''}`}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={reset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
