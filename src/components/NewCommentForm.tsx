import React, { useState } from 'react';
import classNames from 'classnames';

import { Comment } from '../types/Comment';
import { TypeError } from '../types/TypeError';
import { createComment } from '../api/comments';

enum TypeInput {
  Name,
  Email,
  Text,
}

type Props = {
  addingComment: (comment: Comment) => Promise<void>,
  postId: number,
  isError: string,
  setIsError: React.Dispatch<React.SetStateAction<string>>,
};

export const NewCommentForm: React.FC<Props> = ({
  addingComment,
  postId,
  isError,
  setIsError,
}) => {
  const [isProcessed, setIsProcessed] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [emptyName, setEmptyName] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyText, setEmptyText] = useState(false);

  const inputHandler = (inputName: TypeInput) => {
    return (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      let typeEmptyInput;
      let setEmptyInput;
      let setValueInput;

      switch (inputName) {
        case TypeInput.Name:
          typeEmptyInput = emptyName;
          setEmptyInput = setEmptyName;
          setValueInput = setAuthorName;
          break;

        case TypeInput.Email:
          typeEmptyInput = emptyEmail;
          setEmptyInput = setEmptyEmail;
          setValueInput = setAuthorEmail;
          break;

        default:
          typeEmptyInput = emptyText;
          setEmptyInput = setEmptyText;
          setValueInput = setCommentText;
          break;
      }

      if (typeEmptyInput) {
        setEmptyInput(false);
      }

      if (isError) {
        setIsError('');
      }

      setValueInput(event.target.value);
    };
  };

  const addCommentHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsError('');
    if (authorName && authorEmail && commentText) {
      setIsProcessed(true);
      const newComment = {
        postId,
        name: authorName,
        email: authorEmail,
        body: commentText,
      };

      createComment(newComment)
        .then((addedComment) => {
          addingComment(addedComment);
          setCommentText('');
        })
        .catch(() => {
          setIsError(TypeError.Add);
        })
        .finally(() => setIsProcessed(false));
    } else {
      if (!authorName.trim()) {
        setEmptyName(true);
      }

      if (!authorEmail.trim()) {
        setEmptyEmail(true);
      }

      if (!commentText.trim()) {
        setEmptyText(true);
      }
    }
  };

  const clearFormHandler = () => {
    setIsError('');
    setEmptyName(false);
    setAuthorName('');
    setEmptyEmail(false);
    setAuthorEmail('');
    setEmptyText(false);
    setCommentText('');
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={addCommentHandler}
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
            className={classNames(
              'input',
              { 'is-danger': emptyName },
            )}
            value={authorName}
            onChange={inputHandler(TypeInput.Name)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {emptyName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emptyName && (
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
            className={classNames(
              'input',
              { 'is-danger': emptyEmail },
            )}
            value={authorEmail}
            onChange={inputHandler(TypeInput.Email)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emptyEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emptyEmail && (
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
              { 'is-danger': emptyText },
            )}
            value={commentText}
            onChange={inputHandler(TypeInput.Text)}
          />
        </div>

        {emptyText && (
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
              { 'is-loading': isProcessed },
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
            onClick={clearFormHandler}
          >
            Clear
          </button>
        </div>
      </div>

      {isError === TypeError.Add && (
        <div className="notification is-danger">
          {TypeError.Add}
        </div>
      )}
    </form>
  );
};
