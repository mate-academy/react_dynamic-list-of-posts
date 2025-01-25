import classNames from 'classnames';
import React, { useState } from 'react';
import { postComment } from '../api/comments';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  post: Post;
  comments: Comment[];
  onAdd: (comments: Comment[]) => void;
};

export const NewCommentForm: React.FC<Props> = ({ post, comments, onAdd }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isAuthorName, setIsAuthorName] = useState(true);
  const [isAuthorEmail, setIsAuthorEmail] = useState(true);
  const [isCommentText, setIsCommentText] = useState(true);

  const handleClear = () => {
    setAuthorName('');
    setAuthorEmail('');
    setCommentText('');
    setIsAuthorName(true);
    setIsAuthorEmail(true);
    setIsCommentText(true);
  };

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setText: (text: string) => void,
    isFilled: boolean,
    setIsFilled: (isError: boolean) => void,
  ) => {
    if (!isFilled) {
      setIsFilled(true);
    }

    setText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!authorName) {
      setIsAuthorName(false);
    }

    if (!authorEmail) {
      setIsAuthorEmail(false);
    }

    if (!commentText) {
      setIsCommentText(false);
    }

    if (!authorName || !authorEmail || !commentText) {
      return;
    }

    setIsLoading(true);
    postComment(
      { name: authorName, email: authorEmail, body: commentText },
      post.id,
    )
      .then(comment => {
        onAdd([...comments, comment]);
        setCommentText('');
      })
      .finally(() => setIsLoading(false));
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
            className={classNames('input', { 'is-danger': !isAuthorName })}
            value={authorName}
            onChange={event =>
              handleTextChange(
                event,
                setAuthorName,
                isAuthorName,
                setIsAuthorName,
              )
            }
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!isAuthorName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!isAuthorName && (
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
            className={classNames('input', { 'is-danger': !isAuthorEmail })}
            value={authorEmail}
            onChange={event =>
              handleTextChange(
                event,
                setAuthorEmail,
                isAuthorEmail,
                setIsAuthorEmail,
              )
            }
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {!isAuthorEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!isAuthorEmail && (
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
            className={classNames('textarea', { 'is-danger': !isCommentText })}
            value={commentText}
            onChange={event =>
              handleTextChange(
                event,
                setCommentText,
                isCommentText,
                setIsCommentText,
              )
            }
          />
        </div>

        {!isCommentText && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
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
