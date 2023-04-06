import classNames from 'classnames';
import React, { useState } from 'react';
import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';

type NewCommentFormProps = {
  addComment: (newComment: Comment) => void,
  selectedPost: Post,
  comments: CommentData[],
};

export const NewCommentForm: React.FC<NewCommentFormProps> = ({
  addComment,
  selectedPost,
  comments,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  const handleReset = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  const handleAdd = () => {
    const newComment = {
      name,
      email,
      body,
      postId: selectedPost.id,
      id: (Math.max(...comments.map((element) => element.id)) + 1),
    };

    if (!name && !email && !body) {
      setNameError(true);
      setEmailError(true);
      setBodyError(true);

      return;
    }

    if (!name && !email) {
      setNameError(true);
      setEmailError(true);

      return;
    }

    if (!name && !body) {
      setNameError(true);
      setBodyError(true);

      return;
    }

    if (!email && !body) {
      setEmailError(true);
      setBodyError(true);

      return;
    }

    if (!name) {
      setNameError(true);

      return;
    }

    if (!body) {
      setBodyError(true);

      return;
    }

    if (!email) {
      setEmailError(true);

      return;
    }

    addComment(newComment);
    setBody('');
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
          {nameError
            ? (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )
            : (
              <span className="icon is-small is-left">
                <i className="fas fa-user" />
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
          {emailError
            ? (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )
            : (
              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
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
              'button is-link',
            )}
            onClick={(event) => {
              event.preventDefault();
              handleAdd();
            }}
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
