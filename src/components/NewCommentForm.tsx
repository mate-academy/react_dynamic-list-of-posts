import React, { Dispatch, SetStateAction, useState } from 'react';
import classNames from 'classnames';
import { Comment, CommentData } from '../types/Comment';
import { createComment } from '../api/comments';
import { warningTimer } from '../utils/warningTimer';

type Props = {
  postId: number | undefined;
  setComments: Dispatch<SetStateAction<Comment[]>>
  setIsHasError: Dispatch<SetStateAction<boolean>>;
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  setComments,
  setIsHasError,
}) => {
  const [isLoader, setIsLoader] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorBody, setErrorBody] = useState(false);
  const [newComment, setNewComment] = useState<CommentData>({
    postId: postId || 0,
    name: '',
    email: '',
    body: '',
  });

  const { name: commentName, email, body } = newComment;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (commentName) {
      setErrorName(false);
    }

    if (email) {
      setErrorEmail(false);
    }

    if (body) {
      setErrorBody(false);
    }

    setNewComment({
      ...newComment,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName) {
      setErrorName(true);

      return;
    }

    if (!email) {
      setErrorEmail(true);

      return;
    }

    if (!body) {
      setErrorBody(true);

      return;
    }

    try {
      setIsLoader(true);
      const commentData = await createComment(newComment);

      setComments(prevComments => [...prevComments, commentData]);
    } catch (error) {
      setIsHasError(true);
      warningTimer(setIsHasError, false, 3000);
    } finally {
      setIsLoader(false);
      const bodyDelete = 'body';

      setNewComment({
        ...newComment,
        [bodyDelete]: '',
      });
    }
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();

    setNewComment({
      postId: postId || 0,
      name: '',
      email: '',
      body: '',
    });
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
            className={classNames(
              'input',
              { 'is-danger': errorName },
            )}
            value={commentName}
            onChange={handleChange}
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
            className={classNames(
              'input',
              { 'is-danger': errorEmail },
            )}
            value={email}
            onChange={handleChange}
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
              { 'is-danger': errorBody },
            )}
            value={body}
            onChange={handleChange}
          />
        </div>

        {errorBody && (
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
              { 'is-loading': isLoader },
            )}
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
