import React, { useState } from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { addComment } from '../services/comments';

type Props = {
  selectedPost: Post | null;
  addNewComment: (newComment: Comment) => void;
  handleSetError: () => void;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPost,
  addNewComment,
  handleSetError,
}) => {
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    comment: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasInputError, setHasInputError] = useState({
    name: '',
    email: '',
    comment: '',
  });

  const handleReset = () => {
    setNewComment({ name: '', email: '', comment: '' });
    setHasInputError({ name: '', email: '', comment: '' });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasInputError((prevState) => ({ ...prevState, name: '' }));
    setNewComment((prevComment) => (
      { ...prevComment, name: event.target.value }));
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasInputError((prevState) => ({ ...prevState, email: '' }));
    setNewComment((prevComment) => (
      { ...prevComment, email: event.target.value }));
  };

  const handleCommentChange
  = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHasInputError((prevState) => ({ ...prevState, comment: '' }));
    setNewComment((prevComment) => (
      { ...prevComment, comment: event.target.value }));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasInputError({
      name: !newComment.name ? 'Name is required' : '',
      email: !newComment.email ? 'Email is required' : '',
      comment: !newComment.comment ? 'Enter some text' : '',
    });

    if (!newComment.name || !newComment.email || !newComment.comment) {
      return;
    }

    setIsLoading(true);

    if (selectedPost) {
      const commentToAdd: Omit<Comment, 'id'> = {
        postId: selectedPost.id,
        name: newComment.name,
        email: newComment.email,
        body: newComment.comment,
      };

      addComment(commentToAdd)
        .then((newCommentFromServer) => {
          addNewComment(newCommentFromServer);
          setNewComment({ name: '', email: '', comment: '' });
        })
        .catch(() => handleSetError())
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleFormSubmit}
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
              { 'is-danger': hasInputError.name },
            )}
            value={newComment.name}
            onChange={handleNameChange}
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
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            value={newComment.email}
            className={classNames(
              'input',
              { 'is-danger': hasInputError.email },
            )}
            onChange={handleEmailChange}
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
            name="body"
            placeholder="Type comment here"
            className={classNames(
              'textarea',
              { 'is-danger': hasInputError.comment },
            )}
            value={newComment.comment}
            onChange={handleCommentChange}
          />
        </div>

        {hasInputError.comment && (
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
              { 'is-loading': isLoading },
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
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
