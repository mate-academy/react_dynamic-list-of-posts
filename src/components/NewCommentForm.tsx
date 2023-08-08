import React, { useState } from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { createComment } from '../api/api';

type Props = {
  selectedPost: Post;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  setError: (v: boolean) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPost, setComments, setError,
}) => {
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [commentBody, setCommentBody] = useState('');
  const [errorCommentBody, setErrorCommentBody] = useState(false);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorName(false);
    setName(event.target.value);
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorEmail(false);
    setEmail(event.target.value);
  };

  const handleCommentBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setErrorCommentBody(false);
    setCommentBody(event.target.value);
  };

  const handleReset = () => {
    setErrorName(false);
    setErrorEmail(false);
    setErrorCommentBody(false);
    setName('');
    setEmail('');
    setCommentBody('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || !email || !commentBody) {
      if (!name) {
        setErrorName(true);
      }

      setErrorEmail(!emailPattern.test(email));

      if (commentBody === '') {
        setErrorCommentBody(true);
      }

      return;
    }

    const newComment = {
      id: 0,
      postId: selectedPost.id,
      name,
      email,
      body: commentBody,
    };

    setLoadingSubmit(true);

    createComment(newComment)
      .then(gettedComment => {
        setComments(currentComments => [...currentComments, gettedComment]);
        setCommentBody('');
      })
      .catch(() => setError(true))
      .finally(() => setLoadingSubmit(false));
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
            className={classNames('input', { 'is-danger': errorName })}
            value={name}
            onChange={handleName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errorName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorName && (
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
            className={classNames('input', { 'is-danger': errorEmail })}
            value={email}
            onChange={handleEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errorEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorEmail && (
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
            className={classNames(
              'textarea',
              { 'is-danger': errorCommentBody },
            )}
            value={commentBody}
            onChange={handleCommentBody}
          />
        </div>

        {errorCommentBody && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
              'button is-link',
              { 'is-loading': loadingSubmit },
            )}
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
