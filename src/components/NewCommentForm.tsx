import classNames from 'classnames';
import React, { useState } from 'react';
import { CommentData } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  addComment: (newComment: CommentData) => void;
  buttonAddLoading: boolean;
  selectedPost: Post | null;
};

export const NewCommentForm: React.FC<Props> = ({
  addComment,
  buttonAddLoading,
  selectedPost,
}) => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [bodyComment, setBodyComment] = useState('');
  const [bodyCommentError, setBodyCommentError] = useState(false);

  let newComment: CommentData;

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setNameError(false);
    setEmailError(false);
    setBodyCommentError(false);

    let hasError = false;

    if (name.trim().length === 0) {
      setNameError(true);
      hasError = true;
    }

    if (email.trim().length === 0) {
      setEmailError(true);
      hasError = true;
    }

    if (bodyComment.trim().length === 0) {
      setBodyCommentError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    if (selectedPost) {
      newComment = {
        postId: selectedPost.id,
        name: name,
        email: email,
        body: bodyComment,
      };

      addComment(newComment);
      setBodyComment('');
    }
  };

  const handleFormClear = () => {
    setName('');
    setEmail('');
    setBodyComment('');
    setNameError(false);
    setEmailError(false);
    setBodyCommentError(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleFormSubmit}>
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
            onChange={e => {
              setName(e.target.value);
              setNameError(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError && (
            <>
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
              <p className="help is-danger" data-cy="ErrorMessage">
                Name is required
              </p>
            </>
          )}
        </div>
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
            onChange={e => {
              setEmail(e.target.value);
              setEmailError(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && (
            <>
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
              <p className="help is-danger" data-cy="ErrorMessage">
                Email is required
              </p>
            </>
          )}
        </div>
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
              'is-danger': bodyCommentError,
            })}
            value={bodyComment}
            onChange={e => {
              setBodyComment(e.target.value);
              setBodyCommentError(false);
            }}
          />
        </div>

        {bodyCommentError && (
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
              'is-loading': buttonAddLoading,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleFormClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
