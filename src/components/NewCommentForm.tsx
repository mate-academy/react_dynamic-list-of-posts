import React, { useState } from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';
import { addComment } from '../api/posts';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPost,
  setComments,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [hasEmptyName, setHasEmptyName] = useState<boolean>(false);
  const [hasEmptyEmail, setHasEmptyEmail] = useState<boolean>(false);
  const [hasEmptyText, setHasEmptyText] = useState<boolean>(false);

  const handleReset = () => {
    setName('');
    setEmail('');
    setCommentText('');

    setHasEmptyName(false);
    setHasEmptyEmail(false);
    setHasEmptyText(false);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasEmptyName(!name.trim());
    setHasEmptyEmail(!email.trim());
    setHasEmptyText(!commentText.trim());

    if (!name.trim() || !email.trim() || !commentText.trim()) {
      return;
    }

    const createdComment = {
      name: name.trim(),
      email: email.trim(),
      body: commentText.trim(),
      postId: selectedPost.id,
    };

    setIsLoading(true);

    addComment(createdComment)
      .then(newComment => {
        setComments(currentComments => [...currentComments, newComment]);
        setCommentText('');
      })
      .catch()
      .finally(() => setIsLoading(false));
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleFormSubmit}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div
          className={classNames('control has-icons-left', {
            'has-icons-right': hasEmptyName,
          })}
        >
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': hasEmptyName,
            })}
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setHasEmptyName(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasEmptyName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasEmptyName && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div
          className={classNames('control has-icons-left', {
            'has-icons-right': hasEmptyEmail,
          })}
        >
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': hasEmptyEmail,
            })}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setHasEmptyEmail(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasEmptyEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasEmptyEmail && (
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
              'is-danger': hasEmptyText,
            })}
            value={commentText}
            onChange={(event) => {
              setCommentText(event.target.value);
              setHasEmptyText(false);
            }}
          />
        </div>

        {hasEmptyText && (
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
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
