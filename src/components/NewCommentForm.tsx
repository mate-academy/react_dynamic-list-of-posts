import React, { useState } from 'react';
import cn from 'classnames';
import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { ErrorMessage } from '../types/ErrorMessage';
import { ShowLoader } from '../types/ShowLoader';
import { client } from '../utils/fetchClient';
import { defaultComment } from '../utils/defaultComment';

type Props = {
  activePost: Post | null,
  onAddComments: (newComment: Comment) => void,
  setIsProcessing:(string: string) => void,
  isProcessing: string,
  setErrorMessage:(message: ErrorMessage) => void
};

export const NewCommentForm: React.FC<Props> = ({
  activePost,
  onAddComments,
  isProcessing,
  setIsProcessing,
  setErrorMessage,
}) => {
  const [newComment, setNewComment] = useState<CommentData>(defaultComment);

  const [touhed, setTouched] = useState(false);

  const errorChecking = (input : string) => {
    return !input.trim() && touhed;
  };

  const { name, email, body } = newComment;

  const handleAddNewcomment = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (name.trim() && email.trim() && body.trim()) {
      setIsProcessing(ShowLoader.AddComment);
      client.post<Comment>('/comments', {
        ...newComment,
        postId: activePost?.id,
      })
        .then(response => onAddComments(response))
        .catch(() => setErrorMessage(ErrorMessage.AddNewComment))
        .finally(() => setIsProcessing(''));
      setNewComment({ ...newComment, body: '' });
      setTouched(false);
    } else {
      setTouched(true);
    }
  };

  const handleResetForm = () => {
    setTouched(false);
    setNewComment(defaultComment);
  };

  return (
    <form data-cy="NewCommentForm">
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
            className={cn('input', { 'is-danger': errorChecking(name) })}
            value={newComment.name}
            onChange={(e) => setNewComment(
              { ...newComment, name: e.target.value },
            )}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errorChecking(name) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorChecking(name) && (
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
            className={cn('input', { 'is-danger': errorChecking(email) })}
            value={email}
            onChange={(e) => setNewComment(
              { ...newComment, email: e.target.value },
            )}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {errorChecking(email) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {errorChecking(email) && (
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
            className={cn('textarea', { 'is-danger': errorChecking(body) })}
            value={body}
            onChange={(e) => setNewComment(
              { ...newComment, body: e.target.value },
            )}
          />
        </div>

        {errorChecking(body) && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn(
              'button',
              'is-link',
              { 'is-loading': isProcessing === ShowLoader.AddComment },
            )}
            onClick={(e) => handleAddNewcomment(e)}
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
