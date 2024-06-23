import React, { useContext, useState } from 'react';
import { InitialContext } from './ToDoContext';
import { CommentData } from '../types/Comment';
import { addComment } from '../utils/sevicePosts';
import classNames from 'classnames';

export const NewCommentForm = () => {
  const [authorInput, setAuthorInput] = useState('');
  const [bodyInput, setBodyInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [authorError, setAuthorError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { selectedPost, setErrorNotification, setComments, comments } =
    useContext(InitialContext);

  const handleClearButton = () => {
    setBodyError(false);
    setAuthorError(false);
    setEmailError(false);
    setAuthorInput('');
    setBodyInput('');
    setEmailInput('');
  };

  const HandleAddingComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emptyAuthor = !authorInput.trim();
    const emptyBody = !bodyInput.trim();
    const emptyEmail = !emailInput.trim();

    setAuthorError(emptyAuthor);
    setBodyError(emptyBody);
    setEmailError(emptyEmail);

    if (!authorError && !emailError && !bodyError) {
      const AddNewComment: CommentData = {
        name: authorInput.trim(),
        body: bodyInput.trim(),
        email: emailInput.trim(),
        postId: selectedPost && selectedPost.id,
      };

      setIsLoading(true);

      addComment(AddNewComment)
        .then(newComment => {
          addComment(newComment);
          setComments([...comments, newComment]);
          setBodyInput('');
        })
        .catch(() => {
          setErrorNotification('Unable to add a comment');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    return;
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={HandleAddingComment}
      onReset={handleClearButton}
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
            className={classNames('input', { 'is-danger': authorError })}
            value={authorInput}
            onChange={event => {
              setAuthorInput(event.target.value);
            }}
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
            className={classNames('input', { 'is-danger': emailError })}
            value={emailInput}
            onChange={event => {
              setEmailInput(event.target.value);
            }}
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
            className={classNames('textarea', { 'is-danger': bodyError })}
            value={bodyInput}
            onChange={event => {
              setBodyInput(event.target.value);
            }}
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
            className={classNames('button is-link', {
              'is-loading': isLoading,
            })}
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
    </form>
  );
};
