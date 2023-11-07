import React, { useState } from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';
import { addComment } from '../api/services';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post | null;
  addNewComment(commentFromServer: Comment): void;
  onSetError(): void;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPost,
  addNewComment,
  onSetError,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  // const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [emailError, serEmailError] = useState(false);
  const [commentError, setCommentError] = useState(false);

  const cleanFormHandler = () => {
    setName('');
    setEmail('');
    setComment('');
    setNameError(false);
    serEmailError(false);
    setCommentError(false);
  };

  const onSetName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameError(false);
    setName(event.target.value);
  };

  const onSetEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    serEmailError(false);
    setEmail(event.target.value);
  };

  const onSetComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentError(false);
    setComment(event.target.value);
  };

  const handleFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!name) {
      setNameError(true);
    }

    if (!email) {
      serEmailError(true);
    }

    if (!comment) {
      setCommentError(true);
    }

    if (!name || !email || !comment) {
      return;
    }

    let newComment;

    setLoading(true);

    try {
      if (selectedPost) {
        newComment = {
          postId: selectedPost.id,
          name,
          email,
          body: comment,
        };

        const newCommentFromServer = await addComment(newComment);

        addNewComment(newCommentFromServer);

        setComment('');
      }
    } catch {
      onSetError();
    } finally {
      setLoading(false);
    }
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
            value={name}
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn(
              'input',
              { 'is-danger': nameError },
            )}
            onChange={onSetName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError
            && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
        </div>

        {nameError
          && (
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
            value={email}
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn(
              'input',
              { 'is-danger': emailError },
            )}
            onChange={onSetEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {nameError
            && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
        </div>

        {emailError
          && (
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
            value={comment}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={cn(
              'textarea',
              { 'is-danger': commentError },
            )}
            onChange={onSetComment}
          />
        </div>

        {commentError
          && (
            <p className="help is-danger" data-cy="ErrorMessage">
              Enter some text
            </p>
          )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={loading}
            type="submit"
            className={cn(
              'button is-link',
              { 'is-loading': loading },
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
            onClick={() => cleanFormHandler()}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
