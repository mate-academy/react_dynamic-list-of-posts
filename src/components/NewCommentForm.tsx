import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useComments } from '../providers/CommentProvider';
import { usePosts } from '../providers/PostProvider';
import classNames from 'classnames';

export const NewCommentForm: React.FC = () => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [body, setBody] = useState('');
  const [bodyError, setBodyError] = useState(false);

  const { addComment, isLoading } = useComments();
  const { selectedPost } = usePosts();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameError(false);
    setName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailError(false);
    setEmail(e.target.value);
  };

  const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBodyError(false);
    setBody(e.target.value);
  };

  const handleClearAll = () => {
    setName('');
    setNameError(false);
    setEmail('');
    setEmailError(false);
    setBody('');
    setBodyError(false);
  };

  const handleSubmit = (e: FormEvent) => {
    if (!selectedPost) {
      throw new Error('not selected post');
    }

    e.preventDefault();

    let error = false;

    if (!name) {
      setNameError(true);
      error = true;
    }

    if (!email) {
      setEmailError(true);
      error = true;
    }

    if (!body) {
      setBodyError(true);
      error = true;
    }

    if (!error) {
      addComment({ name, email, body, postId: selectedPost.id });
      setBody('');
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
            className={classNames('input', { 'is-danger': nameError })}
            value={name}
            onChange={handleNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameError && (
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
            className={classNames('input', { 'is-danger': emailError })}
            value={email}
            onChange={handleEmailChange}
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
            className={classNames('input', { 'is-danger': bodyError })}
            value={body}
            onChange={handleBodyChange}
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
            onClick={handleClearAll}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
