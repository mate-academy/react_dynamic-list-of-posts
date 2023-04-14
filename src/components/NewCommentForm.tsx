import React, { useState } from 'react';
import classNames from 'classnames';
import { addComment, getComments } from '../utils/api';
import { Comment } from '../types/Comment';

interface Props {
  postId: number,
  updateComments: (postId: Comment[] | null) => void,
  setLoadingErrorNotice: (error: string) => void,
}

export const NewCommentForm: React.FC<Props> = ({
  postId,
  updateComments,
  setLoadingErrorNotice,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [hasEmptyName, setEmptyName] = useState(false);
  const [hasEmptyEmail, setEmptyEmail] = useState(false);
  const [hasEmptyCommentBody, setEmptyCommentBody] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingErrorNotice('');

    const createComment = {
      id: 0,
      postId,
      name,
      email,
      body: comment,
    };

    if (!name.trim()) {
      setEmptyName(true);
    }

    if (!email.trim()) {
      setEmptyEmail(true);
    }

    if (!comment.trim()) {
      setEmptyCommentBody(true);
    }

    if (!name.trim() || !email.trim() || !comment.trim()) {
      return;
    }

    try {
      setLoading(true);
      await addComment(createComment);
      const comments = await getComments(postId);

      updateComments(comments);

      setComment('');
    } catch (error) {
      setLoadingErrorNotice('Unable to add comment, please try again');
    } finally {
      setLoading(false);
    }
  };

  const handleChangeName = (newName: string) => {
    setName(newName);
    setEmptyName(false);
  };

  const handleChangeEmail = (newEmail: string) => {
    setEmail(newEmail);
    setEmptyEmail(false);
  };

  const handleChangeComment = (newComment: string) => {
    setComment(newComment);
    setEmptyCommentBody(false);
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setComment('');
    setEmptyName(false);
    setEmptyEmail(false);
    setEmptyCommentBody(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
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
              { 'is-danger': hasEmptyName },
            )}
            value={name}
            onChange={({ target }) => handleChangeName(target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasEmptyName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasEmptyName && (
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
            value={email}
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames(
              'input',
              { 'is-danger': hasEmptyEmail },
            )}
            onChange={({ target }) => handleChangeEmail(target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasEmptyEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasEmptyEmail && (
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
            value={comment}
            placeholder="Type comment here"
            className={classNames(
              'textarea',
              { 'is-danger': hasEmptyCommentBody },
            )}
            onChange={({ target }) => handleChangeComment(target.value)}
          />
        </div>

        {hasEmptyCommentBody && (
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
          <button
            type="button"
            className="button is-link is-light"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
