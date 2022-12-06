import classNames from 'classnames';
import React from 'react';
import { addComment } from '../api/comments';
import { Comment } from '../types/Comment';
import { Errors } from '../types/Errors';
import { Post } from '../types/Post';

type Props = {
  selectedPost: Post | undefined,
  comments: Comment[] | undefined,
  setComments(comments: Comment[]): void,
  setError(error: Errors): void
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPost,
  comments,
  setComments,
  setError,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [name, setName] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [body, setBody] = React.useState('');
  const [bodyError, setBodyError] = React.useState(false);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !body.trim()) {
      if (!name.trim()) {
        setNameError(true);
      }

      if (!email.trim()) {
        setEmailError(true);
      }

      if (!body.trim()) {
        setBodyError(true);
      }

      return;
    }

    if (selectedPost) {
      const commentToAdd: Comment = {
        id: 0,
        postId: selectedPost.id,
        name,
        email,
        body,
      };

      setIsLoading(true);

      addComment(commentToAdd)
        .then(result => {
          setComments(comments ? [...comments, result] : [result]);
        })
        .catch(() => setError(Errors.AddComment))
        .finally(() => setIsLoading(false));

      setBody('');
    }
  };

  const clearFields = () => {
    setName('');
    setNameError(false);
    setEmail('');
    setEmailError(false);
    setBody('');
    setBodyError(false);
  };

  return (
    <form
      data-cy="NewCommentForm"
      action="https://mate.academy/students-api"
      method="POST"
      onSubmit={handleFormSubmit}
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
              { 'is-danger': nameError },
            )}
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setNameError(false);
            }}
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
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames(
              'input',
              { 'is-danger': emailError },
            )}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setEmailError(false);
            }}
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
            placeholder="Type comment here"
            className={classNames(
              'textarea',
              { 'is-danger': bodyError },
            )}
            value={body}
            onChange={(event) => {
              setBody(event.target.value);
              setBodyError(false);
            }}
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
            onClick={() => clearFields()}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
