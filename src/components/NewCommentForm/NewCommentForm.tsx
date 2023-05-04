import React, { useState } from 'react';
import classNames from 'classnames';
import { Comment, CommentData, CommentDataErrors } from '../../types/Comment';
import {
  checkInputsHaveErrors, validateCommentData,
} from '../../utils/helpers';
import { client } from '../../utils/fetchClient';
import { InputNames } from '../../types/InputNames';

type Props = {
  handleAddComment: (comment: Comment) => void;
  setHasLoadingError: (value: boolean) => void;
  postId: number;
};

export const NewCommentForm: React.FC<Props> = ({
  handleAddComment,
  setHasLoadingError,
  postId,
}) => {
  const [commentData, setCommentData] = useState<CommentData>({
    name: '',
    email: '',
    body: '',
  });
  const [hasInputError, setHasInputError] = useState<CommentDataErrors>({
    name: false,
    email: false,
    body: false,
  });
  const [isCommentLoading, setIsCommentLoading] = useState(false);

  const handleTextInput = (value: string, name: InputNames) => {
    if (!commentData[name].length && value === ' ') {
      return;
    }

    if (hasInputError[name]) {
      setHasInputError(prevInputErrors => ({
        ...prevInputErrors,
        [name]: false,
      }));
    }

    setCommentData(prevCommentData => ({
      ...prevCommentData,
      [name]: value,
    }));
  };

  const handleResetForm = () => {
    setCommentData({ name: '', email: '', body: '' });
    setHasInputError({ name: false, email: false, body: false });
  };

  const resetBody = () => {
    setCommentData(prevCommentData => ({
      ...prevCommentData,
      body: '',
    }));
  };

  const addComment = async () => {
    try {
      setIsCommentLoading(true);
      const data = { ...commentData, postId };
      const newComment: Comment = await client.post('/comments', data);

      handleAddComment(newComment);
      resetBody();
    } catch {
      setHasLoadingError(true);
    } finally {
      setIsCommentLoading(false);
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const possibleErrors = validateCommentData(commentData);
    const haveInputsErrors = checkInputsHaveErrors(possibleErrors);

    if (haveInputsErrors) {
      setHasInputError(possibleErrors);

      return;
    }

    addComment();
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

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name={InputNames.Name}
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames(
              'input',
              { 'is-danger': hasInputError.name },
            )}
            value={commentData.name}
            onChange={({ target }) => {
              handleTextInput(target.value, InputNames.Name);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasInputError.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasInputError.name && (
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
            name={InputNames.Email}
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames(
              'input',
              { 'is-danger': hasInputError.email },
            )}
            value={commentData.email}
            onChange={({ target }) => {
              handleTextInput(target.value, InputNames.Email);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasInputError.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasInputError.email && (
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
            name={InputNames.Body}
            placeholder="Type comment here"
            className={classNames(
              'textarea',
              { 'is-danger': hasInputError.body },
            )}
            value={commentData.body}
            onChange={({ target }) => {
              handleTextInput(target.value, InputNames.Body);
            }}
          />
        </div>

        {hasInputError.body && (
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
              { 'is-loading': isCommentLoading },
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
            onClick={handleResetForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
