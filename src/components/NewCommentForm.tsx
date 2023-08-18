import React, { useState } from 'react';
import classNames from 'classnames';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  addComments:(addingComment: Omit<Comment, 'id'>) => void
  selectPost: Post | null
};

export const NewCommentForm: React.FC<Props> = ({
  addComments,
  selectPost,
}) => {
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [authorText, setAuthorText] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = () => {
    if (authorName.trim() || authorEmail.trim() || authorText.trim()) {
      setIsError(true);
    } else {
      const newComment: Omit<Comment, 'id'> = {
        postId: selectPost?.id || 0,
        name: authorName,
        email: authorEmail,
        body: authorText,
      };

      addComments(newComment);
      setIsLoaded(false);
      setIsError(false);
      setAuthorText('');
    }
  };

  return (
    <form data-cy="NewCommentForm">
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
            className="input is-danger"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>
        {isError && (
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
            className="input is-danger"
            value={authorEmail}
            onChange={(e) => setAuthorEmail(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        {isError && (
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
            className="textarea is-danger"
            value={authorText}
            onChange={(e) => setAuthorText(e.target.value)}
          />
        </div>

        {isError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', { 'is-loaded': isLoaded })}
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
