import React, { FormEvent, useState } from 'react';
import classNames from 'classnames';
import { CommentData } from '../types/Comment';

type Props = {
  onAddComment: (comment: CommentData) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({ onAddComment }) => {
  const [newCommentValues, setNewCommentValues] = useState({
    name: '',
    email: '',
    comment: '',
  });

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [commentError, setCommentError] = useState(false);
  const [isAddingComment, setIsAddingComment] = useState(false);

  // Move the function 'errorsCheck' above its usage
  const errorsCheck = () => {
    setNameError(!newCommentValues.name.trim());
    setEmailError(!newCommentValues.email.trim());
    setCommentError(!newCommentValues.comment.trim());
  };

  const clearAll = () => {
    // Clear all error states and input values
    setNameError(false);
    setEmailError(false);
    setCommentError(false);
    setNewCommentValues({
      name: '',
      email: '',
      comment: '',
    });
  };

  const postComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    errorsCheck();

    // Check if all fields have valid values
    if (newCommentValues.name && newCommentValues.email
      && newCommentValues.comment) {
      try {
        // Set loading state while adding the comment
        setIsAddingComment(true);

        // Create a new comment object
        const newComment: CommentData = {
          name: newCommentValues.name,
          email: newCommentValues.email,
          body: newCommentValues.comment,
        };

        // Call the onAddComment function to add the new comment
        await onAddComment(newComment);
      } catch {
        throw new Error('Can\'t add new comment');
      } finally {
        // Reset the loading state and clear the comment input
        setIsAddingComment(false);
        setNewCommentValues((prevValues) => ({
          ...prevValues,
          comment: '',
        }));
      }
    }
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={postComment}
    >
      {/* Input for Author Name */}
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
            className={classNames(
              'input',
              { 'is-danger': nameError },
            )}
            value={newCommentValues.name}
            onChange={(e) => {
              // Update the name input value and reset the name error state
              setNewCommentValues((prevValues) => ({
                ...prevValues,
                name: e.target.value,
              }));
              setNameError(false);
            }}
          />
          {/* Icon for error indication */}
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {/* Error icon shown when there is a nameError */}
          {nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {/* Error message shown when there is a nameError */}
        {nameError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        )}
      </div>

      {/* Input for Author Email */}
      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames(
              'input',
              { 'is-danger': emailError },
            )}
            value={newCommentValues.email}
            onChange={(e) => {
              // Update the email input value and reset the email error state
              setNewCommentValues((prevValues) => ({
                ...prevValues,
                email: e.target.value,
              }));
              setEmailError(false);
            }}
          />

          {/* Icon for error indication */}
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {/* Error icon shown when there is an emailError */}
          {emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {/* Error message shown when there is an emailError */}
        {emailError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        )}
      </div>

      {/* Input for Comment Text */}
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
              { 'is-danger': commentError },
            )}
            value={newCommentValues.comment}
            onChange={(e) => {
              // Update the comment input value and reset the comment error state
              setNewCommentValues((prevValues) => ({
                ...prevValues,
                comment: e.target.value,
              }));
              setCommentError(false);
            }}
          />
        </div>

        {/* Error message shown when there is a commentError */}
        {commentError && (
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
              'button',
              'is-link',
              { 'is-loading': isAddingComment },
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
            onClick={clearAll}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
