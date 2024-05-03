import React, { useState } from 'react';
import { useAppContext } from '../context/store';
import classNames from 'classnames';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

export const NewCommentForm: React.FC = () => {
  const {
    state: { selectedPost },
    methods: { addComment },
  } = useAppContext();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [authorName, setAuthorName] = useState<string>('');
  const [authorEmail, setAuthorEmail] = useState<string>('');
  const [commentBody, setCommentBody] = useState<string>('');
  const [authorError, setAuthorError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  const handleClearButton = () => {
    setAuthorName('');
    setAuthorEmail('');
    setCommentBody('');

    setAuthorError(false);
    setEmailError(false);
    setBodyError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let errors = 0;

    setIsSubmitting(true);

    if (!authorName.trim() || !authorEmail.trim() || !commentBody.trim()) {
      setIsSubmitting(false);

      return;
    }

    const currentPost = selectedPost as Post;

    const newComment: Omit<Comment, 'id'> = {
      postId: currentPost.id,
      name: authorName.trim(),
      email: authorEmail.trim(),
      body: commentBody.trim(),
    };

    addComment(newComment);

    if (!authorName.trim()) {
      setAuthorError(true);
      errors++;
    }

    if (!authorEmail.trim()) {
      setEmailError(true);
      errors++;
    }

    if (!commentBody.trim()) {
      setBodyError(true);
      errors++;
    }

    if (!errors) {
      setCommentBody('');
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
            className={classNames('input', {
              'is-danger': authorError,
            })}
            value={authorName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setAuthorName(event.target.value)
            }
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {authorError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {authorError && (
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
            className={classNames('input', {
              'is-danger': emailError,
            })}
            value={authorEmail}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setAuthorEmail(event.target.value)
            }
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailError && (
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
            className={classNames('textarea', {
              'is-danger': bodyError,
            })}
            value={commentBody}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              setCommentBody(event.target.value)
            }
          />
        </div>

        {bodyError && (
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
              'is-loading': isSubmitting,
            })}
            onClick={() => setIsSubmitting(true)}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClearButton}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
