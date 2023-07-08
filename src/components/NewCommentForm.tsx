/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import classNames from 'classnames';
import { postNewComment } from '../utils/helperFunctions';
import { Comment } from '../types/Comment';
import { ErrorType } from '../types/ErrorType';

type Props = {
  postId: number,
  updatePostComments: React.Dispatch<React.SetStateAction<Comment[]>>
  updateErrorStatus: (error: ErrorType) => void,
};

const getIntialCommentState = (postId: number) => ({
  name: '',
  email: '',
  body: '',
  postId,
});

export const NewCommentForm: React.FC<Props> = ({
  postId,
  updatePostComments,
  updateErrorStatus,
}) => {
  const [newComment, setNewComment] = useState(getIntialCommentState(postId));
  const [isLoading, setIsLoading] = useState(false);
  const [isName, setIsName] = useState(true);
  const [isEmail, setIsEmail] = useState(true);
  const [isBody, setIsBody] = useState(true);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    if (name === 'name' && !isName) {
      setIsName(true);
    }

    if (name === 'email' && !isEmail) {
      setIsEmail(true);
    }

    if (name === 'body' && !isBody) {
      setIsBody(true);
    }

    setNewComment(currentComment => ({
      ...currentComment,
      [name]: value,
    }));
  };

  const addNewComment = async () => {
    try {
      setIsLoading(true);
      const fetchComment = await postNewComment(newComment);

      updatePostComments(currentComments => [...currentComments, fetchComment]);
    } catch {
      updateErrorStatus(ErrorType.general);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let isNotValid;

    if (!newComment.name) {
      setIsName(false);
      isNotValid = true;
    }

    if (!newComment.email) {
      setIsEmail(false);
      isNotValid = true;
    }

    if (!newComment.body) {
      setIsBody(false);
      isNotValid = true;
    }

    if (isNotValid) {
      return;
    }

    addNewComment();

    setNewComment(getIntialCommentState(postId));
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmitComment}
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
              {
                'is-danger': !isName,
              },
            )}
            onChange={handleInputChange}
            value={newComment.name}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!isName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!isName && (
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
              {
                'is-danger': !isEmail,
              },
            )}
            value={newComment.email}
            onChange={handleInputChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {!isEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!isEmail && (
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
              {
                'is-danger': !isBody,
              },
            )}
            value={newComment.body}
            onChange={handleInputChange}
          />
        </div>

        {!isBody && (
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
              {
                'is-loading': isLoading,
              },
            )}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
