import React, { useState } from 'react';
import classNames from 'classnames';
import { Comment } from '../types/Comment';
import { addComment } from '../api/posts';

type Props = {
  activePostId: number,
  postComments: Comment[],
  setPostComments(comment: Comment[]): void,
};

interface NewComment {
  name: string;
  email: string;
  body: string;
}

export const NewCommentForm: React.FC<Props> = ({
  activePostId,
  postComments,
  setPostComments,
}) => {
  const [newComment, setNewComment] = useState<NewComment>({
    name: '',
    email: '',
    body: '',
  });
  const [isAdding, setIsAdding] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isNameError, setIsNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isTextError, setIsTextError] = useState(false);

  const addPostComments = async (comment: Omit<Comment, 'id'>) => {
    setIsError(false);
    setIsAdding(true);

    try {
      const response = await addComment(comment);

      setPostComments([
        ...postComments,
        response,
      ]);
    } catch {
      setIsError(true);
      setTimeout(() => setIsError(false), 2500);
    } finally {
      setIsAdding(false);

      setNewComment({
        ...newComment,
        body: '',
      });
    }
  };

  const trimText = (text: string) => (
    text[0] === ' ' ? text.trim() : text
  );

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();

        if (newComment.name === '') {
          setIsNameError(true);
        }

        if (newComment.email === '') {
          setIsEmailError(true);
        }

        if (newComment.body === '') {
          setIsTextError(true);
        }

        if (newComment.name
          && newComment.email
          && newComment.body) {
          const commentToAdd: Omit<Comment, 'id'> = {
            postId: activePostId,
            name: newComment.name,
            email: newComment.email,
            body: newComment.body,
          };

          addPostComments(commentToAdd);
        } else {
          setIsTextError(true);
        }
      }}
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
            className={classNames('input', { 'is-danger': isNameError })}
            value={newComment.name}
            onChange={(event) => {
              setIsNameError(false);
              setNewComment({
                ...newComment,
                name: trimText(event.target.value),
              });
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isNameError && (
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
            className={classNames('input', { 'is-danger': isEmailError })}
            value={newComment.email}
            onChange={(event) => {
              setIsEmailError(false);
              setNewComment({
                ...newComment,
                email: trimText(event.target.value),
              });
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isEmailError && (
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
            className={classNames('textarea', { 'is-danger': isTextError })}
            value={newComment.body}
            onChange={(event) => {
              setIsTextError(false);
              setNewComment({
                ...newComment,
                body: trimText(event.target.value),
              });
            }}
          />
        </div>

        {isTextError && (
          <p
            className="help is-danger"
            data-cy="ErrorMessage"
          >
            Enter some text
          </p>
        )}
      </div>

      {isError && (
        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong
        </div>
      )}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', { 'is-loading': isAdding })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={() => {
              setNewComment({
                name: '',
                email: '',
                body: '',
              });
              setIsNameError(false);
              setIsEmailError(false);
              setIsTextError(false);
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
