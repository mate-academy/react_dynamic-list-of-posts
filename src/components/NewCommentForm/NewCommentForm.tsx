import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { client } from '../../utils/fetchClient';
import { CommentData, Comment } from '../../types/Comment';

type Props = {
  postId: number;
  onAddComment: (comment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  onAddComment,
}) => {
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isWaiting, setIsWaiting] = useState(false);

  const postComment = useCallback(async (commentData: CommentData) => {
    setIsWaiting(true);

    try {
      const postedComment = await client.post<Comment>(
        '/comments',
        commentData,
      );

      onAddComment(postedComment);
    } catch (error) {
      // some error handling
    }

    setIsWaiting(false);
  }, []);

  const handleAddComment = (event: React.FormEvent) => {
    event.preventDefault();
    setNameError(name.length === 0);
    setEmailError(email.length === 0);
    setBodyError(body.length === 0);

    if (name.length === 0
        || email.length === 0
        || body.length === 0) {
      return;
    }

    postComment({
      name,
      email,
      body,
      postId,
    });
    setBody('');
  };

  const handleNameChange = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNameError(false);
    setName(event.target.value);
  }, []);

  const handleEmailChange = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEmailError(false);
    setEmail(event.target.value);
  }, []);

  const handleBodyChange = useCallback((
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setBodyError(false);
    setBody(event.target.value);
  }, []);

  const handleClear = useCallback(() => {
    setNameError(false);
    setEmailError(false);
    setBodyError(false);
    setName('');
    setEmail('');
    setBody('');
  }, []);

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleAddComment}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>
        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleNameChange}
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames(
              'input',
              {
                'is-danger': nameError,
              },
            )}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameError && (
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
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames(
              'input',
              {
                'is-danger': emailError,
              },
            )}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailError && (
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
            value={body}
            onChange={handleBodyChange}
            placeholder="Type comment here"
            className={classNames(
              'textarea',
              {
                'is-danger': bodyError,
              },
            )}
          />
        </div>

        {bodyError && (
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
                'is-loading': isWaiting,
              },
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
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
