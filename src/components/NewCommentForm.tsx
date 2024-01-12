import classNames from 'classnames';
import React, { useState } from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { createComment } from '../services/comment';

type Props = {
  selectedPost: Post,
  commentsPost: Comment[],
  setCommentsPost: (commentsPost: Comment[]) => void,
  setErrorMessageComments: (value: string) => void,
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPost,
  commentsPost,
  setCommentsPost,
  setErrorMessageComments,
}) => {
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [bodyMessage, setBodyMessage] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasBodyMessageError, setHasBodyMessageError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setHasEmailError(false);
  };

  const handleCommentChange = (event: React
    .ChangeEvent<HTMLTextAreaElement>) => {
    setBodyMessage(event.target.value);
    setHasBodyMessageError(false);
  };

  function addComment({
    postId,
    name: commentName,
    email: commentEmail,
    body,
  }: Comment) {
    setErrorMessageComments('');
    setLoading(true);

    createComment({
      postId,
      name: commentName,
      email: commentEmail,
      body,
    })
      .then(newComment => {
        setCommentsPost([...commentsPost, newComment]);
        setBodyMessage('');
      })
      .catch(() => {
        setErrorMessageComments('Something went wrong!');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title.trim());
    setHasEmailError(!email.trim());
    setHasBodyMessageError(!bodyMessage.trim());

    if (!title.trim() || !email.trim() || !bodyMessage.trim()) {
      return;
    }

    addComment({
      id: commentsPost.length,
      postId: selectedPost.id,
      name: title,
      email,
      body: bodyMessage,
    });
  };

  const handleClear = () => {
    setTitle('');
    setEmail('');
    setBodyMessage('');
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleAdd}
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
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': hasTitleError,
            })}
            value={title}
            onChange={handleNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasTitleError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasTitleError && (
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
              'is-danger': hasEmailError,
            })}
            value={email}
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
            className={classNames('input', {
              'is-danger': hasBodyMessageError,
            })}
            value={bodyMessage}
            onChange={handleCommentChange}
          />
        </div>

        {hasBodyMessageError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link',
              { 'is-loading': loading })}
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
