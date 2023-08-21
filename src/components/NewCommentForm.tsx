import classNames from 'classnames';
import React, { useState } from 'react';
import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  post: Post;
  onAddNewComment: (comment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({ post, onAddNewComment }) => {
  const [userName, setUserName] = useState('');
  const [hasUserNameError, setHasUserNameError] = useState(false);

  const [userEmail, setUserEmail] = useState('');
  const [hasUserEmailError, setHasUserEmailError] = useState(false);

  const [commentText, setCommentText] = useState('');
  const [hasCommentError, setHasCommentError] = useState(false);

  const [loading, setLoading] = useState(false);
  const [addNewCommentError, setAddNewCommentError] = useState('');

  const handleUserNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setUserName(event.target.value);
    setHasUserNameError(false);
  };

  const handleUserEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setUserEmail(event.target.value);
    setHasUserEmailError(false);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCommentText(event.target.value);
    setHasCommentError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    setHasUserNameError(!userName);
    setHasUserEmailError(!userEmail);
    setHasCommentError(!commentText);

    if (!userName || !userEmail || !commentText) {
      setLoading(false);

      return;
    }

    const data = {
      postId: post.id,
      name: userName,
      email: userEmail,
      body: commentText,
    };

    client.post<Comment>('/comments', data)
      .then((comment) => {
        setAddNewCommentError('');
        setCommentText('');

        onAddNewComment(comment);
      })
      .catch(() => setAddNewCommentError("Can't add comment. Try again later."))
      .finally(() => setLoading(false));
  };

  const handleReset = () => {
    setUserName('');
    setUserEmail('');
    setCommentText('');
    setHasUserNameError(false);
    setHasUserEmailError(false);
    setHasCommentError(false);
    setAddNewCommentError('');
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
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': hasUserNameError })}
            value={userName}
            onChange={(event) => handleUserNameChange(event)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasUserNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasUserNameError && (
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
            className={classNames('input', { 'is-danger': hasUserEmailError })}
            value={userEmail}
            onChange={(event) => handleUserEmailChange(event)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasUserEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasUserEmailError && (
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
            className={classNames('textarea', { 'is-danger': hasCommentError })}
            value={commentText}
            onChange={(event) => handleCommentChange(event)}
          />
        </div>

        {hasCommentError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', { 'is-loading': loading })}
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

      {addNewCommentError && (
        <div
          className="notification is-danger"
          data-cy="PostsLoadingError"
        >
          {addNewCommentError}
        </div>
      )}
    </form>
  );
};
